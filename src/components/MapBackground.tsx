import { useEffect, useRef } from 'react';

// Make sure AMap is available globally
declare global {
  interface Window {
    AMap: any;
    _AMapSecurityConfig: any;
  }
}

interface MapBackgroundProps {
  mode?: 'home' | 'shuttle' | 'comparison';
  /** 目的地起降点 ID，用于 comparison 模式确定航线终点 */
  destinationId?: string;
}

// 真实坐标 (GCJ-02 高德坐标系)
const COORDS = {
  // 用户当前位置 - 卓越世纪中心
  userLocation: [114.0617, 22.5342] as [number, number],
  // 核心起降点网络
  stations: [
    { id: 'futian', name: '福田起降点', pos: [114.06226, 22.53856] },
    { id: 'airport', name: '宝安机场起降点', pos: [113.811, 22.639] },
    { id: 'north_station', name: '深圳北站起降点', pos: [114.029, 22.610] },
    { id: 'shekou', name: '蛇口邮轮中心', pos: [113.916, 22.469] },
  ],
  // 接驳车模拟位置
  shuttle: [114.0620, 22.5360] as [number, number],
};

export function MapBackground({ mode = 'home', destinationId = 'airport' }: MapBackgroundProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let checkInterval: ReturnType<typeof setInterval>;

    const initMap = () => {
      if (window.AMap && window.AMap.Map && mapContainerRef.current) {
        if (!mapInstanceRef.current) {
          const futianPos = COORDS.stations[0].pos;
          let centerLng: number, centerLat: number, zoom: number;

          if (mode === 'home') {
            centerLng = (COORDS.userLocation[0] + futianPos[0]) / 2;
            centerLat = (COORDS.userLocation[1] + futianPos[1]) / 2;
            centerLat -= 0.008;
            zoom = 14.5;
          } else if (mode === 'comparison') {
            // 对比模式：根据 destinationId 动态确定终点
            const destStation = COORDS.stations.find(s => s.id === destinationId) || COORDS.stations[1];
            centerLng = (futianPos[0] + destStation.pos[0]) / 2;
            centerLat = (futianPos[1] + destStation.pos[1]) / 2;
            zoom = 11.5;
          } else {
            // 接驳模式：当前位置 → 起降点，zoom 缩小以显示完整路径
            centerLng = (COORDS.userLocation[0] + futianPos[0]) / 2;
            centerLat = (COORDS.userLocation[1] + futianPos[1]) / 2;
            zoom = 15;
          }

          const map = new window.AMap.Map(mapContainerRef.current, {
            zoom: zoom,
            center: [centerLng, centerLat],
            mapStyle: 'amap://styles/whitesmoke',
            features: ['bg', 'road', 'building', 'point'],
            showLabel: true,
          });

          // ========== 核心渲染逻辑：根据模式绘制航线 ==========
          if (mode === 'comparison') {
            const destStation = COORDS.stations.find(s => s.id === destinationId) || COORDS.stations[1];
            const start = futianPos;
            const end = destStation.pos;

            // 计算控制点以获得平滑优美的弧线（向北拱起）
            const arcHeight = 0.035; // 弧度高度
            const ctrl1 = [
              start[0] + (end[0] - start[0]) * 0.35,
              start[1] + (end[1] - start[1]) * 0.35 + arcHeight
            ];
            const ctrl2 = [
              start[0] + (end[0] - start[0]) * 0.65,
              start[1] + (end[1] - start[1]) * 0.65 + arcHeight
            ];

            const bezierPath = [
              start,
              [
                ctrl1[0], ctrl1[1],
                ctrl2[0], ctrl2[1],
                end[0], end[1]
              ]
            ];

            // 绘制空中贝塞尔航线：使用更精致的虚线效果，体现“数字化航路”
            new window.AMap.BezierCurve({
              path: bezierPath,
              strokeColor: "#000000",
              strokeWeight: 4,
              strokeOpacity: 0.8,
              lineJoin: 'round',
              lineCap: 'round',
              strokeStyle: "dashed",
              strokeDasharray: [10, 10],
              map: map,
              zIndex: 50
            });

            // 增加一条浅色的底线增强质感
            new window.AMap.BezierCurve({
              path: bezierPath,
              strokeColor: "#000000",
              strokeWeight: 8,
              strokeOpacity: 0.15,
              lineJoin: 'round',
              map: map,
              zIndex: 49
            });
          } else if (mode === 'shuttle') {
            // 使用高德驾车路径规划绘制真实道路路径
            window.AMap.plugin('AMap.Driving', function() {
              const driving = new window.AMap.Driving({
                map: map,
                hideMarkers: true,
                showTraffic: false,
                autoFitView: false
              });
              driving.search(
                new window.AMap.LngLat(COORDS.shuttle[0], COORDS.shuttle[1]),
                new window.AMap.LngLat(COORDS.userLocation[0], COORDS.userLocation[1])
              );
            });
          }

          // ========== 1. 当前位置 (更精致的 Apple 风格) ==========
          const userContent = `
            <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none;transform:translate(-50%,-50%);">
              <div style="background:rgba(0,0,0,0.85);padding:3px 10px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);margin-bottom:4px;backdrop-filter:blur(4px);">
                <span style="font-size:11px;font-weight:600;color:white;white-space:nowrap;">当前位置</span>
              </div>
              <div style="position:relative;display:flex;align-items:center;justify-content:center;width:14px;height:14px;">
                <div style="position:absolute;width:28px;height:28px;background:rgba(0,102,204,0.3);border-radius:50%;animation:pulse 2s infinite;"></div>
                <div style="width:10px;height:10px;background:black;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.1);position:relative;z-index:1;"></div>
              </div>
            </div>
          `;

          new window.AMap.Marker({
            position: COORDS.userLocation,
            content: userContent,
            offset: new window.AMap.Pixel(0, 0),
            map: map,
            zIndex: 110
          });

          // ========== 2. 批量渲染起降点 ==========
          const routeMarkers: any[] = [];
          COORDS.stations.forEach((station) => {
            // 对比模式只显示出发点和目的地
            if (mode === 'comparison' && station.id !== 'futian' && station.id !== destinationId) return;
            // 首页只显示福田
            if (mode === 'home' && station.id !== 'futian') return;

            // 福田标签向上偏移，目的地标签向右偏移避免被左边缘裁剪
            const isFutian = station.id === 'futian';
            const transform = isFutian 
              ? 'translate(-50%,-120%)' 
              : 'translate(-10%,-100%)';

            const stationContent = `
              <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none;transform:${transform};">
                <div style="background:white;padding:5px 10px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.12);border:1px solid rgba(0,0,0,0.06);margin-bottom:4px;display:flex;align-items:center;gap:6px;">
                  <div style="width:5px;height:5px;background:black;border-radius:50%;"></div>
                  <span style="font-size:11px;font-weight:700;color:black;white-space:nowrap;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${station.name}</span>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
                <div style="width:6px;height:6px;background:black;border:2px solid white;border-radius:2px;"></div>
              </div>
            `;

            const marker = new window.AMap.Marker({
              position: station.pos,
              content: stationContent,
              offset: new window.AMap.Pixel(0, 0),
              map: map,
              zIndex: 100
            });

            // 对比模式下，收集航线两端标记用于 fitView
            if (mode === 'comparison') {
              routeMarkers.push(marker);
            }
          });

          // 对比模式：自动缩放让两个起降点都在可视区域内
          if (mode === 'comparison' && routeMarkers.length === 2) {
            const adjustView = () => {
              if (!mapInstanceRef.current) return;
              // 地图占上方 42%，四周留 40px padding 即可
              mapInstanceRef.current.setFitView(routeMarkers, false, [40, 40, 40, 40]);
            };
            
            setTimeout(adjustView, 500);
            map.on('complete', adjustView);
          }

          // ========== 接驳模式额外逻辑 ==========
          if (mode === 'shuttle') {
            const carContent = `
              <div style="pointer-events:none;transform:translate(-50%,-50%);">
                <div style="width:32px;height:32px;background:black;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);border:2px solid white;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
                </div>
              </div>
            `;

            new window.AMap.Marker({
              position: COORDS.shuttle,
              content: carContent,
              offset: new window.AMap.Pixel(0, 0),
              map: map,
              zIndex: 120
            });
          }

          mapInstanceRef.current = map;
          clearInterval(checkInterval);
        }
      }
    };

    initMap();
    if (!mapInstanceRef.current) {
      checkInterval = setInterval(initMap, 500);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [mode, destinationId]);

  return (
    <div className="absolute inset-0 z-0 bg-[#F8F8F8]">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
