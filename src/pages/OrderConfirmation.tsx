import { useNavigate, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plane, 
  User, 
  Armchair, 
  Briefcase, 
  ShieldCheck,
  Award,
  Activity,
  Clock,
  Bus,
  CheckCircle2
} from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';
import { Button } from '../components/Button';

export function OrderConfirmation() {
  const navigate = useNavigate();
  const { selectedFlight, fromPad, toPad, passengerCount, selectedSeat, experimentalGroup } = useBookingStore();

  if (!selectedFlight) {
    return <Navigate to="/flight-selection" replace />;
  }

  // 实验设计 2x2x2 组间逻辑
  // 映射 experimentalGroup (0-7) 到 SA, TPE, PT 线索状态
  const getCues = (group: number) => {
    const mapping = [
      [0, 0, 0], // G1: 000
      [1, 0, 0], // G2: 100
      [0, 1, 0], // G3: 010
      [0, 0, 1], // G4: 001
      [1, 1, 0], // G5: 110
      [1, 0, 1], // G6: 101
      [0, 1, 1], // G7: 011
      [1, 1, 1], // G8: 111
    ];
    return mapping[group] || [0, 0, 0];
  };

  const [hasSA, hasTPE, hasPT] = getCues(experimentalGroup);

  // 线索内容定义
  const cuesData = [
    {
      id: 'SA',
      show: hasSA,
      title: '飞行安全保障',
      sub: '本次行程包含平台责任险、应急返航流程与起降点安全核验。',
      icon: <ShieldCheck size={22} className="text-primary" />,
      neutral: {
        title: '登机时间提醒',
        sub: '请在起飞前 8 分钟到达起降点，并完成登机确认。',
        icon: <Clock size={22} className="text-primary" />
      }
    },
    {
      id: 'TPE',
      show: hasTPE,
      title: '认证运营方',
      sub: '服务由完成低空出行运营备案的承运方提供，并接受平台审核。',
      icon: <Award size={22} className="text-primary" />,
      neutral: {
        title: '接驳信息',
        sub: '订单包含从机场低空起降点前往 T3 航站楼的接驳服务。',
        icon: <Bus size={22} className="text-primary" />
      }
    },
    {
      id: 'PT',
      show: hasPT,
      title: '实时飞行透明',
      sub: '天气、航线状态、飞行器准备情况与预计延误将实时更新。',
      icon: <Activity size={22} className="text-primary" />,
      neutral: {
        title: '行李提示',
        sub: '本次行程可携带 1 件不超过 7kg 的随身行李。',
        icon: <Briefcase size={22} className="text-primary" />
      }
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white text-on-surface font-body">
      {/* Header */}
      <header className="shrink-0 flex flex-col border-b border-outline/5 bg-white">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            onClick={() => navigate(-1)}
            aria-label="返回上一页"
            className="p-2 -ml-2 hover:bg-surface-variant transition-colors rounded-full"
          >
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-display-sm font-bold">确认订单</h1>
          <div className="w-10 text-label-sm font-bold text-on-surface-variant opacity-20 flex justify-end">G{experimentalGroup + 1}</div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-24 flex flex-col gap-4 no-scrollbar">
        
        {/* Route Summary - Compact */}
        <section className="bg-white border border-outline/10 rounded-xl p-4 shadow-uber-1">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <Plane size={16} strokeWidth={2} />
            <span className="text-body-md font-bold">{selectedFlight.name}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-display-sm font-bold">{selectedFlight.departureTime}</span>
              <span className="text-caption text-on-surface-variant">福田 CBD</span>
              <span className="text-label-sm font-medium">{fromPad}</span>
            </div>
            
            <div className="flex-1 px-3 flex flex-col items-center">
              <div className="w-full border-t border-dashed border-outline/30"></div>
              <span className="text-caption font-bold text-on-surface-variant mt-1">{selectedFlight.duration}</span>
            </div>
            
            <div className="flex flex-col text-right">
              <span className="text-display-sm font-bold">{selectedFlight.arrivalTime}</span>
              <span className="text-caption text-on-surface-variant">宝安机场 T3</span>
              <span className="text-label-sm font-medium">{toPad}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-outline/5 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1">
              <User size={16} className="text-on-surface-variant" strokeWidth={2} />
              <span className="text-caption font-bold">{passengerCount}人</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Armchair size={16} className="text-on-surface-variant" strokeWidth={2} />
              <span className="text-caption font-bold">座位 {selectedSeat}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Briefcase size={16} className="text-on-surface-variant" strokeWidth={2} />
              <span className="text-caption font-bold">7kg 行李</span>
            </div>
          </div>
        </section>

        {/* 核心实验刺激：出行服务信息 (AOI 1) */}
        <section className="bg-[#F6F8FA] rounded-xl p-4 border border-[#E2E8F0]">
          <h2 className="text-[16px] font-bold text-on-surface mb-3">出行服务信息</h2>
          <div className="space-y-2.5">
            {cuesData.map((cue) => (
              <div 
                key={cue.id} 
                className="bg-white rounded-lg px-4 py-3.5 flex items-center gap-3.5 border border-[#E2E8F0] min-h-[88px]"
              >
                <div className="shrink-0 w-11 h-11 rounded-full bg-[#F6F8FA] flex items-center justify-center border border-[#E2E8F0]">
                  {cue.show ? cue.icon : cue.neutral.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold leading-tight">
                    {cue.show ? cue.title : cue.neutral.title}
                  </h3>
                  <p className="text-[13px] text-[#4B5563] mt-1 leading-[1.45] font-medium line-clamp-2">
                    {cue.show ? cue.sub : cue.neutral.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Price Summary - Compact */}
        <section className="bg-white border border-outline/10 rounded-xl p-4 shadow-uber-1">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="text-label-sm font-medium">空中快线票价</span>
              <span className="text-label-sm font-bold">¥{selectedFlight.price - 30}</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="text-label-sm font-medium">地面接驳服务</span>
              <span className="text-label-sm font-bold">¥30</span>
            </div>
            <div className="pt-3 border-t border-outline/5 flex justify-between items-center">
              <span className="text-body-md font-bold">总计</span>
              <span className="text-body-lg font-bold text-primary">¥{selectedFlight.price}</span>
            </div>
          </div>
        </section>
        
        {/* Payment */}
        <section className="bg-white border border-outline/10 rounded-xl p-3 flex justify-between items-center shadow-uber-1">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#07C160] flex items-center justify-center">
              <CheckCircle2 size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-label-md font-bold">微信支付</span>
          </div>
          <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center p-0.5">
            <div className="w-full h-full rounded-full bg-primary"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="shrink-0 bg-white p-4 pb-safe border-t border-outline/10 z-10">
        <Button 
          size="full"
          shape="pill"
          onClick={() => navigate('/shuttle-info')}
        >
          立即支付 ¥{selectedFlight.price}
        </Button>
      </footer>
    </div>
  );
}
