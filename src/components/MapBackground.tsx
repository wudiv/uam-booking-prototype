import { useEffect, useRef } from 'react';

// Make sure AMap is available globally
declare global {
  interface Window {
    AMap: any;
    _AMapSecurityConfig: any;
  }
}

interface MapBackgroundProps {
  mode?: 'home' | 'shuttle';
}

// 真实坐标 (GCJ-02 高德坐标系)
const COORDS = {
  // 用户当前位置 - 卓越世纪中心 (金田路2030号)
  userLocation: [114.0617, 22.5342] as [number, number],
  // 福田 CBD UAM 起降站点 - 大中华国际交易广场 (福华一路1号)
  station: [114.06226, 22.53856] as [number, number],
  // 接驳车模拟位置 - 两点之间偏路面的位置
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
          // 手动计算中心点
          // 首页：两个标记(用户 + 站点)的中心，然后偏南让标记出现在上半部分
          // 接驳页：三个标记中心，然后大幅偏北，因为底部抽屉遮挡了约55%屏幕
          let centerLng: number, centerLat: number, zoom: number;

          if (mode === 'home') {
            // 两个点的中心
            centerLng = (COORDS.userLocation[0] + COORDS.station[0]) / 2;
            centerLat = (COORDS.userLocation[1] + COORDS.station[1]) / 2;
            // 偏南 0.004° ≈ 偏移半个屏幕高度，让标记出现在底部面板上方
            centerLat -= 0.004;
            zoom = 16;
          } else {
            // 三个点的中心
            centerLng = (COORDS.userLocation[0] + COORDS.station[0] + COORDS.shuttle[0]) / 3;
            centerLat = (COORDS.userLocation[1] + COORDS.station[1] + COORDS.shuttle[1]) / 3;
            // 底部抽屉占用 65vh，将中心稍向南偏 → 标记点出现在抽屉上方
            centerLat -= 0.005;
            zoom = 16;
          }

          const map = new window.AMap.Map(mapContainerRef.current, {
            zoom: zoom,
            center: [centerLng, centerLat],
            mapStyle: 'amap://styles/light',
            features: ['bg', 'road', 'building', 'point'],
            showLabel: true,
          });

          // ========== 1. 用户当前位置 (蓝色脉冲点) ==========
          const userContent = `
            <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none;transform:translate(-50%,-100%);">
              <div style="background:rgba(255,255,255,0.92);backdrop-filter:blur(4px);padding:2px 10px;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,0.12);border:1px solid #DBEAFE;margin-bottom:4px;">
                <span style="font-size:11px;font-weight:700;color:#2563EB;white-space:nowrap;">福田 CBD · 卓越中心</span>
              </div>
              <div style="position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px;">
                <div style="position:absolute;width:24px;height:24px;background:rgba(37,99,235,0.2);border-radius:50%;animation:pulse 2s infinite;"></div>
                <div style="width:12px;height:12px;background:#2563EB;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(37,99,235,0.4);position:relative;z-index:1;"></div>
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

          // ========== 2. 福田 UAM 起降站点 (绿色站点标记) ==========
          const stationContent = `
            <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none;transform:translate(-50%,-100%);">
              <div style="background:white;padding:3px 10px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.15);border:1px solid #E5E7EB;margin-bottom:4px;">
                <div style="font-size:9px;color:#6B7280;font-weight:500;text-align:center;">UAM 起降站点</div>
                <div style="font-size:11px;font-weight:700;color:#059669;white-space:nowrap;text-align:center;">福田 CBD 起降点</div>
              </div>
              <div style="width:20px;height:20px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2.5px solid #059669;box-shadow:0 2px 6px rgba(5,150,105,0.3);">
                <span class="material-symbols-outlined" style="font-size:14px;color:#059669;">flight_takeoff</span>
              </div>
            </div>
          `;

          new window.AMap.Marker({
            position: COORDS.station,
            content: stationContent,
            offset: new window.AMap.Pixel(0, 0),
            map: map,
            zIndex: 100
          });

          // ========== 接驳模式额外标记 ==========
          if (mode === 'shuttle') {
            // 3. 接驳车位置 (品牌色标记)
            const carContent = `
              <div style="display:flex;flex-direction:column;align-items:center;pointer-events:none;transform:translate(-50%,-100%);">
                <div style="background:#006874;padding:5px 12px;border-radius:999px;box-shadow:0 4px 12px rgba(0,104,116,0.35);border:1px solid rgba(255,255,255,0.2);margin-bottom:4px;display:flex;align-items:center;gap:4px;">
                  <span class="material-symbols-outlined" style="font-size:14px;color:white;">airport_shuttle</span>
                  <span style="font-size:11px;font-weight:700;color:white;white-space:nowrap;">接驳车行驶中</span>
                </div>
                <div style="width:14px;height:14px;background:#006874;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,104,116,0.4);"></div>
              </div>
            `;

            new window.AMap.Marker({
              position: COORDS.shuttle,
              content: carContent,
              offset: new window.AMap.Pixel(0, 0),
              map: map,
              zIndex: 120
            });

            // 接驳路线虚线
            new window.AMap.Polyline({
              path: [COORDS.userLocation, COORDS.shuttle, COORDS.station],
              strokeColor: "#006874",
              strokeWeight: 4,
              strokeOpacity: 0.5,
              strokeStyle: "dashed",
              map: map
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
    <div className="absolute inset-0 z-0">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30 pointer-events-none" />
    </div>
  );
}
