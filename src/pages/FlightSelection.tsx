import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { Button } from '../components/Button';
import { ArrowLeft, Car, Plane } from 'lucide-react';

function addMinutesToDate(date: Date, minutes: number) {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return `${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`;
}

export function FlightSelection() {
  const navigate = useNavigate();
  const { selectedFlight, setSelectedFlight, fromAddress, fromPad, toPad, toAddress, bookingDate } = useBookingStore();

  const getRouteParams = () => {
    if (toPad.includes('北站')) return { flightMin: 6, pickupMin: 4, dropoffMin: 3, basePrice: 168 };
    if (toPad.includes('蛇口')) return { flightMin: 12, pickupMin: 5, dropoffMin: 5, basePrice: 298 };
    return { flightMin: 11, pickupMin: 6, dropoffMin: 4, basePrice: 268 };
  };
  const route = getRouteParams();
  const totalMin = route.pickupMin + route.flightMin + route.dropoffMin;
  const arrivalTime = addMinutesToDate(bookingDate, totalMin);
  const pickupStartTime = addMinutesToDate(bookingDate, 2);

  useEffect(() => {
    if (!selectedFlight) {
      const flightDepartTime = addMinutesToDate(bookingDate, route.pickupMin);
      const flightArriveTime = addMinutesToDate(bookingDate, route.pickupMin + route.flightMin);
      setSelectedFlight({
        id: '1',
        name: 'UAM-X 204',
        departureTime: flightDepartTime,
        arrivalTime: flightArriveTime,
        duration: `${route.flightMin}分钟`,
        price: route.basePrice,
        seats: 2,
      });
    }
  }, [selectedFlight, setSelectedFlight, bookingDate, route]);

  const flightStartTime = addMinutesToDate(bookingDate, route.pickupMin);
  const flightEndTime = addMinutesToDate(bookingDate, route.pickupMin + route.flightMin);

  return (
    <div className="bg-white text-on-surface font-body w-full h-full flex flex-col relative">
      {/* Back button overlaid on gradient */}
      <button 
        onClick={() => navigate(-1)}
        aria-label="返回上一页"
        className="absolute top-4 left-4 z-10 p-2 text-primary hover:bg-white/50 rounded-full transition-colors"
      >
        <ArrowLeft size={24} strokeWidth={1.5} />
      </button>

      {/* Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {/* Hero Section with sky gradient - matching Uber Air layout */}
        <div className="relative bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white pt-14 pb-2">
          {/* eVTOL Image - large, right-aligned, overlapping into title area */}
          <img 
            src="/evtol-hero.png" 
            alt="eVTOL 飞行器" 
            className="absolute top-6 right-0 w-52 h-36 object-contain"
          />
          
          {/* Title below image */}
          <div className="px-5 pt-20">
            <h1 className="text-[28px] font-bold leading-[1.2] tracking-tight">
              约{totalMin}分钟<br/>到达{toPad.replace('起降点', '')}
            </h1>
            <p className="text-body-sm text-on-surface-variant mt-2">
              预计 <span className="font-bold text-on-surface">{arrivalTime}</span> 抵达{toAddress || '目的地'}
            </p>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="relative pl-[72px] pr-5 pt-6 pb-6">
          {/* Vertical connector line */}
          <div className="absolute left-[27px] top-4 bottom-8 w-[1.5px] bg-outline/20"></div>

          {/* Segment 1: 专车接驳 */}
          <div className="relative mb-6">
            <div className="absolute -left-[60px] top-0 w-14 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-surface-variant flex items-center justify-center">
                <Car size={18} strokeWidth={2} />
              </div>
              <span className="text-caption font-bold text-on-surface-variant mt-1">{pickupStartTime}</span>
            </div>
            <div className="border border-outline/10 rounded-xl px-4 py-3">
              <p className="text-caption text-on-surface-variant">专车接驳 · {route.pickupMin}分钟</p>
              <p className="text-body-md font-bold mt-0.5">
                {fromAddress} → {fromPad}
              </p>
            </div>
          </div>

          {/* Segment 2: eVTOL 飞行 (highlighted) */}
          <div className="relative mb-6">
            <div className="absolute -left-[60px] top-0 w-14 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Plane size={16} strokeWidth={2} className="text-white rotate-45" />
              </div>
              <span className="text-caption font-bold text-on-surface-variant mt-1">{flightStartTime}</span>
            </div>
            <div className="border-2 border-primary rounded-xl px-4 py-3 bg-primary/[0.02] shadow-uber-1">
              <p className="text-caption font-bold text-primary">eVTOL 飞行 · {route.flightMin}分钟</p>
              <p className="text-body-md font-bold mt-0.5">
                {fromPad} → {toPad}
              </p>
            </div>
          </div>

          {/* Segment 3: 机场接驳 */}
          <div className="relative">
            <div className="absolute -left-[60px] top-0 w-14 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-surface-variant flex items-center justify-center">
                <Car size={18} strokeWidth={2} />
              </div>
              <span className="text-caption font-bold text-on-surface-variant mt-1">{flightEndTime}</span>
            </div>
            <div className="border border-outline/10 rounded-xl px-4 py-3">
              <p className="text-caption text-on-surface-variant">机场接驳 · {route.dropoffMin}分钟</p>
              <p className="text-body-md font-bold mt-0.5">
                {toPad} → {toAddress || '目的地'}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-outline/10 px-5 py-4 pb-safe">
        <div className="flex justify-center items-center mb-3">
          <span className="text-body-lg font-bold">¥{route.basePrice}</span>
          <span className="text-label-sm text-on-surface-variant ml-2">/ 1名乘客 ⓘ</span>
        </div>
        <Button 
          size="full"
          shape="pill"
          onClick={() => navigate('/seat-selection')}
        >
          确认预订
        </Button>
      </div>
    </div>
  );
}
