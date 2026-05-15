import React from 'react';
import { ShieldCheck, FileCheck, Eye, Info, Clock, Briefcase, Headphones, Bell } from 'lucide-react';

interface Props {
  group: number; // 1-8
}

const SafetyServiceInfo: React.FC<Props> = ({ group }) => {
  const code = group - 1;
  const hasSA = (code & 4) !== 0;  // 100
  const hasTPE = (code & 2) !== 0; // 010
  const hasPT = (code & 1) !== 0;  // 001
  const isNeutral = !hasSA && !hasTPE && !hasPT;

  const SA_CUES = [
    { icon: ShieldCheck, text: '事故保险' },
    { icon: ShieldCheck, text: '应急救援' },
    { icon: ShieldCheck, text: '无责退改' },
    { icon: ShieldCheck, text: '责任赔付' }
  ];

  const TPE_CUES = [
    { icon: FileCheck, text: '监管许可' },
    { icon: FileCheck, text: '适航认证' },
    { icon: FileCheck, text: '安全审查' },
    { icon: FileCheck, text: '机构背书' }
  ];

  const PT_CUES = [
    { icon: Eye, text: '航线可视化' },
    { icon: Eye, text: '起飞前自检' },
    { icon: Eye, text: '空域限制' },
    { icon: Eye, text: '数据说明' }
  ];

  const NEUTRAL_CUES = [
    { icon: Clock, text: '提前登机时间' },
    { icon: Briefcase, text: '行李尺寸提示' },
    { icon: Headphones, text: '在线客服入口' },
    { icon: Bell, text: '行程变动提醒' }
  ];

  let displayCues: { icon: React.ElementType, text: string }[] = [];
  
  if (isNeutral) {
    displayCues = [...NEUTRAL_CUES];
  } else {
    // 灵活组装，以满足弹性排版
    if (hasSA) displayCues = [...displayCues, ...SA_CUES.slice(0, 2)];
    if (hasTPE) displayCues = [...displayCues, ...TPE_CUES.slice(0, 2)];
    if (hasPT) displayCues = [...displayCues, ...PT_CUES.slice(0, 2)];
    
    // 如果只有一种，显示4条
    if (hasSA && !hasTPE && !hasPT) displayCues = [...SA_CUES];
    if (!hasSA && hasTPE && !hasPT) displayCues = [...TPE_CUES];
    if (!hasSA && !hasTPE && hasPT) displayCues = [...PT_CUES];

    // 如果三种全有，展示4条
    if (hasSA && hasTPE && hasPT) {
      displayCues = [SA_CUES[0], TPE_CUES[0], PT_CUES[0], SA_CUES[1]]; 
    }
  }

  const renderCues = displayCues.slice(0, 4);

  return (
    <div className="fade-in" style={{
      width: '100%',
      // 取消绝对高度，改为根据内容自适应的精美卡片
      backgroundColor: '#f8f9fa',
      borderRadius: 'var(--radius-lg)',
      padding: '16px',
      boxSizing: 'border-box',
      border: '1px solid var(--acme-gray-border)',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px'
    }}>
      <h3 className="font-heading" style={{
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--acme-navy)',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <Info size={16} color="var(--acme-blue)" />
        {isNeutral ? '服务信息' : '安全与服务保障'}
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '12px',
        rowGap: '16px',
      }}>
        {renderCues.map((cue, idx) => {
          const Icon = cue.icon;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 102, 204, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--acme-blue)'
              }}>
                <Icon size={16} />
              </div>
              <span style={{ fontSize: '13px', color: 'var(--acme-navy)', fontWeight: 500, lineHeight: 1.2 }}>
                {cue.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SafetyServiceInfo;
