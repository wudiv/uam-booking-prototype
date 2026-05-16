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

export function MapBackground({ mode = 'home' }: MapBackgroundProps) {
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
            // 对比模式：显示从福田到机场的长途航线
            // 两个标记：福田 (22.538) 和宝安机场 (22.639)，跨度 ~0.10° 纬度
            // 底部抽屉占 45% (top-[55%])，需将航线显示在上方 55% 可见区域
            // 中点纬度 22.589，向南偏移 0.07° 让航线出现在屏幕上半部分
            centerLng = (futianPos[0] + COORDS.stations[1].pos[0]) / 2;
            centerLat = (futianPos[1] + COORDS.stations[1].pos[1]) / 2;
            centerLat -= 0.07; // 向南大幅偏移，确保避开 45% 底部抽屉
            zoom = 10;
          } else {
            // 接驳模式：当前位置 → 接驳车 → 起降点 (仅在 300px 容器中，无需避让抽屉)
            centerLng = (COORDS.userLocation[0] + futianPos[0] + COORDS.shuttle[0]) / 3;
            centerLat = (COORDS.userLocation[1] + futianPos[1] + COORDS.shuttle[1]) / 3;
            zoom = 16;
          }

          const map = new window.AMap.Map(mapContainerRef.current, {
            zoom: zoom,
            center: [centerLng, centerLat],
            mapStyle: 'amap://styles/whitesmoke',
            features: ['bg', 'road', 'building', 'point'],
            showLabel: true,
          });

          // ========== 核心渲染逻辑：根据模式绘制航线 ==========
          if (mode === 'comparison' || mode === 'shuttle') {
            const path = mode === 'comparison' 
              ? [futianPos, COORDS.stations[1].pos] 
              : [COORDS.shuttle, futianPos];
            
            // 绘制空中航线：使用更精致的虚线效果，体现“数字化航路”
            new window.AMap.Polyline({
              path: path,
              strokeColor: mode === 'comparison' ? "#000000" : "#0066FF",
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
            new window.AMap.Polyline({
              path: path,
              strokeColor: mode === 'comparison' ? "#000000" : "#0066FF",
              strokeWeight: 8,
              strokeOpacity: 0.1,
              lineJoin: 'round',
              map: map,
              zIndex: 49
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

          // ========== 2. 批量渲染起降点 (更轻量的气泡) ==========
          const routeMarkers: any[] = [];
          COORDS.stations.forEach((station, idx) => {
            // 首页只显示福田和选中的目的地，避免拥挤
            if (mode === 'home' && idx > 1) return;

            const stationContent = `
              <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none;transform:translate(-50%,-50%);">
                <div style="background:rgba(255,255,255,0.9);padding:3px 10px;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.08);border:1px solid rgba(0,0,0,0.1);margin-bottom:4px;backdrop-filter:blur(4px);">
                  <div style="font-size:11px;font-weight:700;color:black;white-space:nowrap;">${station.name}</div>
                </div>
                <div style="width:10px;height:10px;background:white;border:2px solid black;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,0.1);"></div>
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
            if (mode === 'comparison' && (idx === 0 || idx === 1)) {
              routeMarkers.push(marker);
            }
          });

          // 对比模式：自动缩放以让两个起降点都避开底部抽屉
          if (mode === 'comparison' && routeMarkers.length === 2) {
            const adjustView = () => {
              if (!mapInstanceRef.current) return;
              const h = window.innerHeight;
              // bottom 留出 50% 屏幕高度作为 padding，确保标记在抽屉上方
              mapInstanceRef.current.setFitView(routeMarkers, false, [60, 60, Math.floor(h * 0.48), 60]);
            };
            
            setTimeout(adjustView, 500);
            map.on('complete', adjustView);
          }

          // ========== 接驳模式额外逻辑 ==========
          if (mode === 'shuttle') {
            const carContent = `
              <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none;transform:translate(-50%,-100%);">
                <div style="background:black;padding:5px 12px;border-radius:14px;box-shadow:0 6px 16px rgba(0,0,0,0.2);margin-bottom:6px;display:flex;align-items:center;gap:5px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                  <span style="font-size:11px;font-weight:700;color:white;white-space:nowrap;">接驳车已出发</span>
                </div>
                <div style="width:8px;height:8px;background:black;border-radius:50%;border:2px solid white;"></div>
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
  }, [mode]);

  return (
    <div className="absolute inset-0 z-0 bg-[#F8F8F8]">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
