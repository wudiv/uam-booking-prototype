import { useNavigate } from 'react-router-dom';
import { MapBackground } from '../components/MapBackground';
import { Button } from '../components/Button';
import { useBookingStore } from '../store/useBookingStore';
import BlurText from '../components/animations/BlurText';
import { 
  Menu, 
  Bell, 
  Home as HomeIcon, 
  Plane, 
  Users, 
  User, 
  Clock, 
  Circle, 
  Square 
} from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const { fromAddress, toAddress, setDestination } = useBookingStore();

  return (
    <div className="bg-background text-on-surface w-full h-full overflow-hidden relative font-body">
      {/* TopAppBar - Uber Minimalist */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-14 bg-white/90 backdrop-blur-md">
        <button aria-label="打开菜单" className="text-primary p-2 rounded-full active:bg-surface-variant transition-colors">
          <Menu size={24} strokeWidth={1.5} />
        </button>
        <BlurText 
          text="空行 UAM" 
          className="text-display-sm font-bold tracking-tight"
        />
        <button aria-label="打开通知" className="text-primary p-2 rounded-full active:bg-surface-variant transition-colors">
          <Bell size={24} strokeWidth={1.5} />
        </button>
      </header>

      {/* Map Canvas Layer */}
      <main className="absolute inset-0 w-full h-full z-0">
        <MapBackground />
        
        {/* Subtle Overlay for UI contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10 pointer-events-none"></div>
      </main>

      {/* Floating Search Sheet - Uber Level 2 */}
      <div className="absolute bottom-[80px] left-0 w-full px-3 z-40">
        <div className="bg-white rounded-xl shadow-uber-2 border border-outline/10 overflow-hidden">
          {/* Categories Selector */}
          <div className="flex items-center px-4 border-b border-outline/10" role="tablist" aria-label="服务类别">
            <button role="tab" aria-selected="false" className="px-5 py-4 text-label-md font-bold text-on-surface-variant whitespace-nowrap">网约车</button>
            <button role="tab" aria-selected="false" className="px-5 py-4 text-label-md font-bold text-on-surface-variant whitespace-nowrap">地铁</button>
            <button role="tab" aria-selected="false" className="px-5 py-4 text-label-md font-bold text-on-surface-variant whitespace-nowrap">预约</button>
            <button role="tab" aria-selected="true" className="px-5 py-4 text-label-md font-bold text-primary border-b-3 border-primary whitespace-nowrap">UAM</button>
          </div>
          
          <div className="p-4 flex flex-col gap-4">
            {/* Location Inputs */}
            <div className="flex relative bg-surface-variant rounded-lg p-4">
              {/* Connector Line */}
              <div className="absolute left-[31px] top-10 bottom-10 w-0.5 bg-primary/20"></div>
              
              <div className="flex flex-col gap-5 w-full">
                {/* Start Location */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <Circle size={10} fill="black" strokeWidth={0} />
                  </div>
                  <div className="flex-1 pb-3 border-b border-outline/30">
                    <span className="text-body-md font-medium text-on-surface">{fromAddress}</span>
                  </div>
                </div>
                
                {/* Destination */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <Square size={10} strokeWidth={2.5} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="destination" className="sr-only">目的地</label>
                    <input 
                      id="destination"
                      className="w-full bg-transparent border-none p-0 text-display-md font-bold text-on-surface placeholder:text-on-surface-variant focus:ring-0 outline-none" 
                      placeholder="你要去哪儿？" 
                      type="text" 
                      value={toAddress}
                      onChange={(e) => setDestination(e.target.value)}
                      aria-label="输入目的地"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Suggestions */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { label: '宝安机场 T3', id: 'airport' },
                { label: '深圳北站', id: 'station' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setDestination(item.label)}
                  aria-label={`选择 ${item.label} 作为目的地`}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-variant rounded-pill text-label-sm font-bold text-on-surface hover:bg-outline/20 transition-colors flex-shrink-0"
                >
                  <Clock size={14} strokeWidth={2} />
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Main CTA */}
            <Button 
              size="full"
              shape="pill"
              onClick={() => {
                if (toAddress) navigate('/route-comparison');
              }}
              disabled={!toAddress}
              aria-label={`查看前往 ${toAddress} 的出行方案`}
            >
              查看方案
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Uber Style */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-3 pb-safe px-4 bg-white border-t border-outline/10" aria-label="底部导航">
        <button aria-label="首页" className="flex flex-col items-center gap-1 w-16">
          <HomeIcon size={24} strokeWidth={2} className="text-primary" />
          <span className="text-label-sm font-bold text-primary">首页</span>
        </button>
        <button aria-label="行程列表" className="flex flex-col items-center gap-1 w-16 text-on-surface-variant opacity-60">
          <Plane size={24} strokeWidth={1.5} />
          <span className="text-label-sm font-bold">行程</span>
        </button>
        <button aria-label="发现新内容" className="flex flex-col items-center gap-1 w-16 text-on-surface-variant opacity-60">
          <Users size={24} strokeWidth={1.5} />
          <span className="text-label-sm font-bold">发现</span>
        </button>
        <button aria-label="个人资料" className="flex flex-col items-center gap-1 w-16 text-on-surface-variant opacity-60">
          <User size={24} strokeWidth={1.5} />
          <span className="text-label-sm font-bold">我的</span>
        </button>
      </nav>
    </div>
  );
}
