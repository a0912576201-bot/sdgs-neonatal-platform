import React, { useState, useMemo, useEffect } from 'react';
import {
  Activity,
  Baby,
  BookOpen,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  Edit3,
  Eye,
  FileText,
  Filter,
  Globe,
  HeartPulse,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  LineChart,
  Menu,
  MessageSquareHeart,
  Plus,
  RefreshCw,
  Scale,
  Search,
  Settings,
  ShieldAlert,
  Sliders,
  Sparkles,
  Target,
  Thermometer,
  Trash2,
  TrendingDown,
  TrendingUp,
  Type,
  Users,
  X,
  AlertTriangle,
  Award,
  BarChart3,
  Check
} from 'lucide-react';

// ============================================================================
// INITIAL MOCK DATASETS (Based on UN IGME / WHO Neonatal Mortality Statistics)
// ============================================================================

const INITIAL_COUNTRIES = [
  {
    id: 'TWN',
    name: '台灣 (Taiwan)',
    region: '東亞與東南亞',
    income: '高收入',
    nmr2024: 2.4,
    nmr2015: 2.6,
    nmr2000: 4.1,
    nmr1990: 5.8,
    skilledBirth: 99.8,
    pretermRate: 9.2,
    healthSpendPct: 6.6,
    annualBirthsK: 135,
    status: '已達標',
    history: { 1990: 5.8, 1995: 4.9, 2000: 4.1, 2005: 3.5, 2010: 2.9, 2015: 2.6, 2020: 2.5, 2024: 2.4 }
  },
  {
    id: 'JPN',
    name: '日本 (Japan)',
    region: '東亞與東南亞',
    income: '高收入',
    nmr2024: 0.8,
    nmr2015: 0.9,
    nmr2000: 1.8,
    nmr1990: 2.5,
    skilledBirth: 99.9,
    pretermRate: 5.6,
    healthSpendPct: 11.5,
    annualBirthsK: 730,
    status: '已達標',
    history: { 1990: 2.5, 1995: 2.1, 2000: 1.8, 2005: 1.4, 2010: 1.1, 2015: 0.9, 2020: 0.8, 2024: 0.8 }
  },
  {
    id: 'SGP',
    name: '新加坡 (Singapore)',
    region: '東亞與東南亞',
    income: '高收入',
    nmr2024: 0.9,
    nmr2015: 1.1,
    nmr2000: 1.9,
    nmr1990: 3.6,
    skilledBirth: 99.7,
    pretermRate: 8.5,
    healthSpendPct: 5.6,
    annualBirthsK: 34,
    status: '已達標',
    history: { 1990: 3.6, 1995: 2.5, 2000: 1.9, 2005: 1.5, 2010: 1.2, 2015: 1.1, 2020: 0.9, 2024: 0.9 }
  },
  {
    id: 'SWE',
    name: '瑞典 (Sweden)',
    region: '歐洲與北美',
    income: '高收入',
    nmr2024: 1.3,
    nmr2015: 1.6,
    nmr2000: 2.3,
    nmr1990: 3.5,
    skilledBirth: 99.9,
    pretermRate: 5.8,
    healthSpendPct: 10.7,
    annualBirthsK: 105,
    status: '已達標',
    history: { 1990: 3.5, 1995: 2.7, 2000: 2.3, 2005: 1.9, 2010: 1.7, 2015: 1.6, 2020: 1.4, 2024: 1.3 }
  },
  {
    id: 'USA',
    name: '美國 (United States)',
    region: '歐洲與北美',
    income: '高收入',
    nmr2024: 3.3,
    nmr2015: 3.9,
    nmr2000: 4.6,
    nmr1990: 5.8,
    skilledBirth: 99.1,
    pretermRate: 10.4,
    healthSpendPct: 16.6,
    annualBirthsK: 3600,
    status: '已達標',
    history: { 1990: 5.8, 1995: 5.0, 2000: 4.6, 2005: 4.5, 2010: 4.1, 2015: 3.9, 2020: 3.5, 2024: 3.3 }
  },
  {
    id: 'BRA',
    name: '巴西 (Brazil)',
    region: '拉丁美洲與加勒比海',
    income: '中高收入',
    nmr2024: 8.2,
    nmr2015: 9.7,
    nmr2000: 16.5,
    nmr1990: 26.2,
    skilledBirth: 98.8,
    pretermRate: 11.2,
    healthSpendPct: 9.7,
    annualBirthsK: 2650,
    status: '已達標',
    history: { 1990: 26.2, 1995: 21.4, 2000: 16.5, 2005: 13.4, 2010: 11.1, 2015: 9.7, 2020: 8.8, 2024: 8.2 }
  },
  {
    id: 'IDN',
    name: '印尼 (Indonesia)',
    region: '東亞與東南亞',
    income: '中高收入',
    nmr2024: 10.8,
    nmr2015: 14.2,
    nmr2000: 22.8,
    nmr1990: 31.5,
    skilledBirth: 94.7,
    pretermRate: 10.4,
    healthSpendPct: 3.7,
    annualBirthsK: 4450,
    status: '已達標',
    history: { 1990: 31.5, 1995: 26.8, 2000: 22.8, 2005: 19.3, 2010: 16.4, 2015: 14.2, 2020: 12.1, 2024: 10.8 }
  },
  {
    id: 'KHM',
    name: '柬埔寨 (Cambodia)',
    region: '東亞與東南亞',
    income: '中低收入',
    nmr2024: 12.6,
    nmr2015: 16.5,
    nmr2000: 36.4,
    nmr1990: 44.1,
    skilledBirth: 98.7,
    pretermRate: 10.1,
    healthSpendPct: 7.5,
    annualBirthsK: 315,
    status: '進展順利',
    history: { 1990: 44.1, 1995: 41.2, 2000: 36.4, 2005: 27.1, 2010: 20.4, 2015: 16.5, 2020: 14.1, 2024: 12.6 }
  },
  {
    id: 'IND',
    name: '印度 (India)',
    region: '中亞與南亞',
    income: '中低收入',
    nmr2024: 17.5,
    nmr2015: 26.2,
    nmr2000: 44.8,
    nmr1990: 57.4,
    skilledBirth: 89.4,
    pretermRate: 13.0,
    healthSpendPct: 3.3,
    annualBirthsK: 23100,
    status: '進展順利',
    history: { 1990: 57.4, 1995: 51.2, 2000: 44.8, 2005: 38.0, 2010: 31.8, 2015: 26.2, 2020: 20.3, 2024: 17.5 }
  },
  {
    id: 'KEN',
    name: '肯亞 (Kenya)',
    region: '撒哈拉以南非洲',
    income: '中低收入',
    nmr2024: 20.4,
    nmr2015: 23.8,
    nmr2000: 31.2,
    nmr1990: 33.4,
    skilledBirth: 89.3,
    pretermRate: 9.8,
    healthSpendPct: 4.5,
    annualBirthsK: 1480,
    status: '需加速推進',
    history: { 1990: 33.4, 1995: 32.8, 2000: 31.2, 2005: 28.5, 2010: 25.9, 2015: 23.8, 2020: 21.8, 2024: 20.4 }
  },
  {
    id: 'PAK',
    name: '巴基斯坦 (Pakistan)',
    region: '中亞與南亞',
    income: '中低收入',
    nmr2024: 37.6,
    nmr2015: 44.5,
    nmr2000: 56.2,
    nmr1990: 64.0,
    skilledBirth: 74.2,
    pretermRate: 14.4,
    healthSpendPct: 2.9,
    annualBirthsK: 6400,
    status: '需加速推進',
    history: { 1990: 64.0, 1995: 60.1, 2000: 56.2, 2005: 52.3, 2010: 48.6, 2015: 44.5, 2020: 40.2, 2024: 37.6 }
  },
  {
    id: 'NGA',
    name: '奈及利亞 (Nigeria)',
    region: '撒哈拉以南非洲',
    income: '中低收入',
    nmr2024: 33.8,
    nmr2015: 37.4,
    nmr2000: 49.5,
    nmr1990: 50.8,
    skilledBirth: 50.7,
    pretermRate: 11.4,
    healthSpendPct: 4.1,
    annualBirthsK: 7900,
    status: '需加速推進',
    history: { 1990: 50.8, 1995: 50.2, 2000: 49.5, 2005: 44.6, 2010: 40.5, 2015: 37.4, 2020: 35.4, 2024: 33.8 }
  }
];

const GLOBAL_TREND_SERIES = {
  global: {
    label: '全球平均 (Global Average)',
    color: '#0d9488',
    data: { 1990: 36.6, 1995: 33.4, 2000: 30.2, 2005: 26.1, 2010: 22.3, 2015: 19.3, 2020: 17.7, 2024: 17.0 }
  },
  ssa: {
    label: '撒哈拉以南非洲 (Sub-Saharan Africa)',
    color: '#e11d48',
    data: { 1990: 45.4, 1995: 43.2, 2000: 40.5, 2005: 35.8, 2010: 31.7, 2015: 28.9, 2020: 27.2, 2024: 26.4 }
  },
  csa: {
    label: '中亞與南亞 (Central & Southern Asia)',
    color: '#f59e0b',
    data: { 1990: 55.8, 1995: 50.4, 2000: 44.6, 2005: 38.2, 2010: 32.1, 2015: 26.8, 2020: 22.1, 2024: 20.5 }
  },
  esea: {
    label: '東亞與東南亞 (Eastern & SE Asia)',
    color: '#2563eb',
    data: { 1990: 27.8, 1995: 23.6, 2000: 19.4, 2005: 14.8, 2010: 11.2, 2015: 8.9, 2020: 7.4, 2024: 6.8 }
  },
  ena: {
    label: '歐洲與北美 (Europe & North America)',
    color: '#6366f1',
    data: { 1990: 7.9, 1995: 6.4, 2000: 5.3, 2005: 4.5, 2010: 3.8, 2015: 3.4, 2020: 3.1, 2024: 2.9 }
  }
};

const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    category: '黃金28天日常照護',
    title: '新生兒「黃金28天」居家照護全攻略：安全睡眠與臍帶護理',
    readTime: '4 分鐘',
    audience: '新手爸媽・祖父母照護者',
    summary: '出生後前28天是生命最脆弱也最關鍵的時期。掌握「仰睡不趴睡」、室內通風溫濕度控制與正確臍帶消毒步驟，能大幅降低意外風險。',
    keyPoints: [
      '安全睡眠五不原則：不趴睡、不用枕、不同床、不悶熱、不鬆軟（床鋪保持平坦堅實）。',
      '室內環境建議：室溫維持在 24°C–26°C，相對濕度 50%–60%，避免冷氣出風口直吹寶寶。',
      '臍帶照護：每天洗澡後以 75% 酒精由臍根部向外環狀消毒，保持乾燥透氣，通常於 7–14 天自然脫落。',
      '接觸寶寶前務必使用肥皂濕洗手至少 20 秒，謝絕有感冒或呼吸道症狀的親友近距離接觸。'
    ],
    date: '2026-09-12'
  },
  {
    id: 'art-2',
    category: '黃疸與體溫監測',
    title: '如何分辨生理性與病理性黃疸？居家膚色與體溫觀察指南',
    readTime: '5 分鐘',
    audience: '全齡照護者',
    summary: '約有 60% 足月兒與 80% 早產兒會出現新生兒黃疸。學會觀察黃疸蔓延部位與體溫變化，避免延誤照光治療時機。',
    keyPoints: [
      '在充足自然光線下，輕壓寶寶鼻尖、額頭或胸口皮膚，放開瞬間若呈明顯蠟黃色，代表黃疸指數偏高。',
      '黃疸通常由臉部開始，若向下延伸至腹部甚至大腿、小腿，請立即前往小兒科檢測經皮黃疸值。',
      '正常新生兒耳溫/肛溫為 36.5°C–37.5°C；若低於 36.0°C（低體溫）或高於 38.0°C（發燒）均屬警訊。',
      '切勿自行給寶寶餵食葡萄糖水或退胎火草藥，充足的母乳或配方奶哺餵才是促進膽紅素排出的最佳方式。'
    ],
    date: '2026-09-28'
  },
  {
    id: 'art-3',
    category: '危險徵兆辨識',
    title: '必須立即就醫的「新生兒 8 大危險紅旗徵兆」',
    readTime: '3 分鐘',
    audience: '緊急應變必讀',
    summary: '新生兒不會用言語表達不適，一旦出現活動力下降、呼吸急促或吸吮無力，往往是敗血症或嚴重感染的早期表現。',
    keyPoints: [
      '體溫異常：肛溫/耳溫 ≥ 38.0°C 或低於 36.0°C（低體溫在早產兒與敗血症中尤為常見）。',
      '呼吸異常：每分鐘呼吸超過 60 次、出現鼻翼煽動、胸骨上凹或肋間凹陷、嘴唇發紫（發紺）。',
      '進食狀況驟變：連續兩餐拒食、吸吮力明顯變弱，或出現噴射狀嘔吐、嘔吐物含綠色膽汁。',
      '意識與活動力：嗜睡叫不醒、哭聲微弱尖銳、四肢軟弱無力或出現異常抽搐。',
      '排泄與臍部異常：一天濕尿布少於 6 片、大便呈灰白色/淡黃色（膽道閉鎖警訊）、臍帶周圍紅腫流膿。'
    ],
    date: '2026-10-05'
  },
  {
    id: 'art-4',
    category: '餵養與營養',
    title: '母乳哺餵與配方奶沖泡標準：從排泄量判斷寶寶吃飽沒',
    readTime: '4 分鐘',
    audience: '新手爸媽・保母',
    summary: '新生兒胃容量在出生第一天僅如一顆小彈珠（約 5-7 ml）。透過觀察每日尿布重量與體重回升曲線，輕鬆掌握營養攝取。',
    keyPoints: [
      '出生後前 7 天可能出現「生理性體重減輕」（不超過出生體重的 7%–10%），通常在 10–14 天內恢復至出生體重。',
      '出生第 6 天起，每天至少應有 6 片以上有重量的濕尿布，尿液呈清澈或淡黃色。',
      '沖泡配方奶務必使用煮沸後冷卻至 70°C 以上的開水沖泡（可殺滅坂崎腸桿菌），再降溫至約 37°C 餵食。',
      '餵奶後採直立抱姿或坐姿輕拍背部 5–10 分鐘排氣，減少溢奶與嗆奶風險。'
    ],
    date: '2026-10-18'
  },
  {
    id: 'art-5',
    category: '早產兒特別照護',
    title: '袋鼠式護理（Kangaroo Mother Care）：給早產兒最溫暖的生命力量',
    readTime: '5 分鐘',
    audience: '早產兒家庭',
    summary: 'WHO 強烈建議對早產兒及低出生體重兒實施袋鼠式護理，透過父母胸前肌膚接觸，穩定寶寶心跳、呼吸與體溫。',
    keyPoints: [
      '讓僅穿尿布的寶寶直立趴在父母裸露的胸前，保持肌膚對肌膚（Skin-to-Skin）緊密接觸，外層覆蓋保暖衣物。',
      '臨床實證可降低早產兒院內感染率、減少呼吸暫停發作，並提升純母乳哺餵成功率。',
      '計算早產兒發展里程碑時，請使用「矯正年齡」（預產期起算）而非實際出生日期，避免過度焦慮。'
    ],
    date: '2026-11-02'
  }
];

const INITIAL_HEALTH_RECORDS = [
  {
    id: 'rec-101',
    babyName: '林小寶 (男)',
    birthDate: '2026-11-04',
    ageDays: 12,
    gestationalWeeks: 39,
    birthWeight: 3250,
    currentWeight: 3410,
    temperature: 36.8,
    feedingMl: 620,
    jaundiceLevel: '輕微 (臉部)',
    notes: '活動力佳，每3小時親餵加瓶餵一次，排便排尿正常。',
    updatedAt: '2026-11-16 09:30'
  },
  {
    id: 'rec-102',
    babyName: '陳沐恩 (女)',
    birthDate: '2026-11-09',
    ageDays: 7,
    gestationalWeeks: 36,
    birthWeight: 2380,
    currentWeight: 2310,
    temperature: 36.4,
    feedingMl: 390,
    jaundiceLevel: '中度 (延及胸部)',
    notes: '晚期早產兒，昨日門診經皮黃疸值 13.8 mg/dL，持續追蹤奶量與膚色變化。',
    updatedAt: '2026-11-16 14:15'
  },
  {
    id: 'rec-103',
    babyName: '張允希 (女)',
    birthDate: '2026-11-12',
    ageDays: 4,
    gestationalWeeks: 38,
    birthWeight: 2980,
    currentWeight: 2860,
    temperature: 37.9,
    feedingMl: 240,
    jaundiceLevel: '無明顯黃疸',
    notes: '下午體溫偏高且吸吮較疲倦，已安排小兒科門診進一步評估。',
    updatedAt: '2026-11-16 18:20'
  }
];

const INITIAL_ADMIN_LOGS = [
  { id: 'log-1', time: '2026-11-16 20:45', type: 'AI風險預警', user: '護理站 #A04', detail: '評估個案（34週早產 / 體溫35.9°C）判定為高風險，已觸發轉診建議通知。', severity: 'high' },
  { id: 'log-2', time: '2026-11-16 18:20', type: '健康紀錄更新', user: '家長帳號 (張先生)', detail: '新增「張允希」第4天照護紀錄，系統自動標記體溫偏高警示。', severity: 'medium' },
  { id: 'log-3', time: '2026-11-15 14:10', type: '資料庫同步', user: '系統排程', detail: '完成 UN IGME 2024/2025 全球新生兒死亡率指標校準更新。', severity: 'low' },
  { id: 'log-4', time: '2026-11-14 10:05', type: '知識庫發布', user: '衛教編輯組', detail: '更新《袋鼠式護理：給早產兒最溫暖的生命力量》圖文指引。', severity: 'low' }
];

// ============================================================================
// UTILITY FUNCTIONS & HELPERS
// ============================================================================

function evaluateRecordStatus(rec) {
  const temp = Number(rec.temperature);
  const weightDiffPct = ((Number(rec.currentWeight) - Number(rec.birthWeight)) / Number(rec.birthWeight)) * 100;

  if (temp >= 38.0 || temp < 36.0 || rec.jaundiceLevel.includes('重度') || weightDiffPct < -10) {
    return {
      level: '異常警示',
      color: 'bg-rose-100 text-rose-800 border-rose-200',
      dot: 'bg-rose-500',
      hint: temp >= 38.0 ? '體溫過高，建議立即就醫評估' : temp < 36.0 ? '低體溫警訊，需立即保暖並就醫' : '體重流失或黃疸顯著，建議小兒科診察'
    };
  }
  if (temp >= 37.6 || rec.jaundiceLevel.includes('中度') || Number(rec.gestationalWeeks) < 37 || weightDiffPct < -7) {
    return {
      level: '需密切觀察',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      dot: 'bg-amber-500',
      hint: '部分生理數值處於臨界範圍，請每 3–4 小時追蹤體溫與餵食量'
    };
  }
  return {
    level: '生長穩定',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    dot: 'bg-emerald-500',
    hint: '各項生命徵象與哺餵指標皆在良好範圍內'
  };
}

// ============================================================================
// CUSTOM SVG CHART COMPONENTS (Zero external library failures, fully responsive)
// ============================================================================

const RegionalBarChart = ({ countries }) => {
  const regionStats = useMemo(() => {
    const groups = {};
    countries.forEach((c) => {
      if (!groups[c.region]) groups[c.region] = { region: c.region, totalNmr: 0, count: 0 };
      groups[c.region].totalNmr += c.nmr2024;
      groups[c.region].count += 1;
    });
    return Object.values(groups)
      .map((g) => ({
        region: g.region,
        avgNmr: Number((g.totalNmr / g.count).toFixed(1))
      }))
      .sort((a, b) => b.avgNmr - a.avgNmr);
  }, [countries]);

  const maxVal = Math.max(...regionStats.map((r) => r.avgNmr), 30);

  return (
    <div className="space-y-4">
      {regionStats.map((item) => {
        const pct = Math.min((item.avgNmr / maxVal) * 100, 100);
        const isAboveTarget = item.avgNmr > 12;
        return (
          <div key={item.region} className="space-y-1.5">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-700">{item.region}</span>
              <span className={`font-bold ${isAboveTarget ? 'text-rose-600' : 'text-teal-700'}`}>
                {item.avgNmr} ‰ {isAboveTarget ? '(高於目標)' : '(已達標)'}
              </span>
            </div>
            <div className="relative h-3.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isAboveTarget ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                }`}
                style={{ width: `${pct}%` }}
              />
              {/* 12.0 target marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                style={{ left: `${(12 / maxVal) * 100}%` }}
                title="SDGs 2030 目標線: 12.0‰"
              />
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-end gap-2 pt-2 text-xs text-slate-500">
        <span className="inline-block w-3 h-0.5 bg-slate-900"></span>
        <span>垂直黑線代表 SDGs 3.2.2 目標閾值 (≤ 12.0‰)</span>
      </div>
    </div>
  );
};

const MultiLineTrendChart = ({ seriesList, years = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024], showTargetLine = true }) => {
  const [hoveredYear, setHoveredYear] = useState(null);

  const width = 760;
  const height = 340;
  const padLeft = 52;
  const padRight = 28;
  const padTop = 28;
  const padBottom = 42;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const allValues = seriesList.flatMap((s) => years.map((y) => s.data[y] ?? 0));
  const maxVal = Math.max(...allValues, 20) * 1.1;

  const getX = (idx) => padLeft + (idx / Math.max(years.length - 1, 1)) * plotW;
  const getY = (val) => padTop + plotH - (val / maxVal) * plotH;

  const yTicks = [0, 12, Math.round(maxVal * 0.4), Math.round(maxVal * 0.7), Math.round(maxVal)].filter(
    (v, i, arr) => arr.indexOf(v) === i && v <= maxVal
  ).sort((a, b) => a - b);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[540px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
          {/* Horizontal grid lines */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            const isTarget = tick === 12 && showTargetLine;
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke={isTarget ? '#059669' : '#e2e8f0'}
                  strokeWidth={isTarget ? 2 : 1}
                  strokeDasharray={isTarget ? '6 4' : '0'}
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className={`text-[11px] font-medium ${isTarget ? 'fill-emerald-700 font-bold' : 'fill-slate-400'}`}
                >
                  {tick}‰
                </text>
              </g>
            );
          })}

          {/* 2030 Target Badge */}
          {showTargetLine && (
            <g transform={`translate(${width - padRight - 148}, ${getY(12) - 22})`}>
              <rect width="148" height="18" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
              <text x="74" y="12.5" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">
                2030 SDGs 目標線 (12.0‰)
              </text>
            </g>
          )}

          {/* X Axis Year Labels */}
          {years.map((yr, idx) => {
            const x = getX(idx);
            return (
              <g key={yr}>
                <line x1={x} y1={padTop} x2={x} y2={padTop + plotH} stroke="#f1f5f9" strokeWidth="1" />
                <text x={x} y={height - 14} textAnchor="middle" className="text-[12px] font-semibold fill-slate-600">
                  {yr}
                </text>
              </g>
            );
          })}

          {/* Data Polylines & Points */}
          {seriesList.map((series) => {
            const points = years
              .map((yr, idx) => {
                const val = series.data[yr];
                if (val === undefined || val === null) return null;
                return `${getX(idx)},${getY(val)}`;
              })
              .filter(Boolean)
              .join(' ');

            return (
              <g key={series.id || series.label}>
                <polyline
                  fill="none"
                  stroke={series.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />
                {years.map((yr, idx) => {
                  const val = series.data[yr];
                  if (val === undefined || val === null) return null;
                  const cx = getX(idx);
                  const cy = getY(val);
                  const isHovered = hoveredYear === yr;
                  return (
                    <g key={yr}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHovered ? 6 : 4}
                        fill="#ffffff"
                        stroke={series.color}
                        strokeWidth="2.5"
                      />
                      {isHovered && (
                        <g transform={`translate(${cx}, ${cy - 14})`}>
                          <rect x="-24" y="-13" width="48" height="17" rx="4" fill={series.color} />
                          <text x="0" y="-1.5" textAnchor="middle" className="text-[10px] font-bold fill-white">
                            {val}‰
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Invisible hover columns for interactive year inspection */}
          {years.map((yr, idx) => {
            const colWidth = plotW / years.length;
            return (
              <rect
                key={`hover-${yr}`}
                x={getX(idx) - colWidth / 2}
                y={padTop}
                width={colWidth}
                height={plotH}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredYear(yr)}
                onMouseLeave={() => setHoveredYear(null)}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Navigation & Global Accessibility State
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [largeTextMode, setLargeTextMode] = useState(false);

  // Shared Domain Data States
  const [countries, setCountries] = useState(INITIAL_COUNTRIES);
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [healthRecords, setHealthRecords] = useState(INITIAL_HEALTH_RECORDS);
  const [adminLogs, setAdminLogs] = useState(INITIAL_ADMIN_LOGS);

  // Toast Notification State (Non-blocking UI alert replacement)
  const [toast, setToast] = useState(null);
  const notify = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3600);
  };

  // Navigation Menu Definition (Exact Match to User Architecture)
  const navItems = [
    { id: 'home', label: '首頁總覽儀表板', icon: Home, badge: null },
    { id: 'sdgs-intro', label: 'SDGs介紹', icon: Info, badge: '3.2.2' },
    { id: 'global-stats', label: '全球死亡率統計', icon: Globe, badge: null },
    { id: 'country-compare', label: '國家比較分析', icon: BarChart3, badge: null },
    { id: 'historical-trends', label: '歷年趨勢圖', icon: LineChart, badge: null },
    { id: 'knowledge-base', label: '新生兒照護知識庫', icon: BookOpen, badge: '全齡友善' },
    { id: 'health-records', label: '健康紀錄管理', icon: ClipboardList, badge: `${healthRecords.length}` },
    { id: 'ai-risk', label: 'AI風險評估', icon: BrainCircuit, badge: '智慧預測' },
    { id: 'sdgs-prediction', label: 'SDGs達標預測', icon: Target, badge: '2030' },
    { id: 'admin', label: '後台管理系統', icon: Settings, badge: null }
  ];

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================================================
  // PAGE 1: 首頁 (HOME / VISUAL DASHBOARD)
  // ==========================================================================
  const renderHomePage = () => {
    const achievedCount = countries.filter((c) => c.nmr2024 <= 12).length;
    const alertRecords = healthRecords.filter((r) => evaluateRecordStatus(r).level !== '生長穩定');

    return (
      <div className="space-y-6">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-sky-900 text-white p-6 sm:p-8 shadow-lg">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-teal-100 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>聯合國永續發展目標 UN SDGs 3.2.2 智慧健康治理與親子照護平台</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              守護每一個新生命的第一個 28 天
            </h1>
            <p className="text-teal-50/90 text-sm sm:text-base leading-relaxed">
              結合全球新生兒死亡率大數據、AI 臨床與居家風險評估模型，以及全齡友善的新生兒照護知識庫。無論您是新手爸媽、祖父母照護者，或是公共衛生研究人員，都能在此獲得即時、科學且溫暖的決策支持。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => handleNavigate('ai-risk')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm transition shadow-md cursor-pointer"
              >
                <BrainCircuit className="w-4 h-4" />
                立即進行 AI 新生兒風險評估
              </button>
              <button
                onClick={() => handleNavigate('knowledge-base')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm backdrop-blur-sm transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                瀏覽新生兒照護指南
              </button>
            </div>
          </div>
          {/* Decorative background circles */}
          <div className="hidden md:block absolute -right-12 -bottom-16 w-72 h-72 rounded-full bg-teal-500/20 blur-2xl" />
          <div className="hidden md:block absolute right-24 -top-12 w-48 h-48 rounded-full bg-sky-400/20 blur-xl" />
        </div>

        {/* 4 Core KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">全球新生兒死亡率 (NMR)</span>
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                <Globe className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">17.0 ‰</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> 較1990年降53%
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">每千名活產嬰兒於出生後 28 天內死亡人數</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">SDGs 2030 全球目標值</span>
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-teal-700">≤ 12.0 ‰</span>
              <span className="text-xs font-semibold text-slate-500">距全球均值尚差 5.0‰</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">各國需於 2030 年前將新生兒死亡率降至 12‰ 以下</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">全球年新生兒死亡推估</span>
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                <HeartPulse className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">230 萬</span>
              <span className="text-xs font-semibold text-rose-600">約 6,300 人 / 日</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">佔所有 5 歲以下兒童死亡人數高達 47%</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">資料庫指標國達標比例</span>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {achievedCount} / {countries.length} 國
              </span>
              <span className="text-xs font-semibold text-teal-700">
                ({Math.round((achievedCount / countries.length) * 100)}%)
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">台灣目前為 2.4‰，居全球醫療照護領先群</p>
          </div>
        </div>

        {/* Main Visual Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Global Trend Chart Preview */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">全球與區域新生兒死亡率歷年軌跡 (1990–2024)</h2>
                <p className="text-xs text-slate-500">將滑鼠移至年份節點可檢視各區域每千活產死亡率變化</p>
              </div>
              <button
                onClick={() => handleNavigate('historical-trends')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
              >
                完整趨勢分析 <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <MultiLineTrendChart
              seriesList={[
                { id: 'global', ...GLOBAL_TREND_SERIES.global },
                { id: 'ssa', ...GLOBAL_TREND_SERIES.ssa },
                { id: 'esea', ...GLOBAL_TREND_SERIES.esea }
              ]}
            />

            <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-600"></span>
                <span className="font-medium text-slate-700">全球平均 (17.0‰)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-600"></span>
                <span className="font-medium text-slate-700">撒哈拉以南非洲 (26.4‰)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span className="font-medium text-slate-700">東亞與東南亞 (6.8‰)</span>
              </div>
            </div>
          </div>

          {/* Right: Regional Comparison & Care Alerts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">各區域平均死亡率對比</h2>
                <button
                  onClick={() => handleNavigate('global-stats')}
                  className="text-xs font-semibold text-teal-700 hover:underline cursor-pointer"
                >
                  查看全部國家
                </button>
              </div>
              <RegionalBarChart countries={countries} />
            </div>

            {/* Active Newborn Health Record Alerts */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Baby className="w-5 h-5 text-teal-600" />
                  <h2 className="text-lg font-bold text-slate-900">近期新生兒健康照護動態</h2>
                </div>
                <button
                  onClick={() => handleNavigate('health-records')}
                  className="text-xs font-semibold text-teal-700 hover:underline cursor-pointer"
                >
                  管理紀錄 ({healthRecords.length})
                </button>
              </div>

              <div className="space-y-3">
                {healthRecords.slice(0, 3).map((rec) => {
                  const status = evaluateRecordStatus(rec);
                  return (
                    <div
                      key={rec.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{rec.babyName}</span>
                          <span className="text-xs text-slate-500">出生第 {rec.ageDays} 天</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          體溫 {rec.temperature}°C ・ 體重 {rec.currentWeight}g ・ {rec.jaundiceLevel}
                        </p>
                      </div>
                      <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold border ${status.color}`}>
                        {status.level}
                      </span>
                    </div>
                  );
                })}
              </div>

              {alertRecords.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>目前有 {alertRecords.length} 筆新生兒紀錄標記為「需密切觀察/警示」，建議定期追蹤。</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Module Launcher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => handleNavigate('country-compare')}
            className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow transition cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">跨國醫療指標比較</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              自選最多 5 個國家，同步比較新生兒死亡率、專業人員接生率、早產率與醫療支出佔比。
            </p>
          </div>

          <div
            onClick={() => handleNavigate('sdgs-prediction')}
            className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow transition cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">2030 SDGs 達標政策模擬</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              調整產前照護覆蓋率、NICU 重症加護資源與感染防治強度，模擬各國能否於 2030 年前順利達標。
            </p>
          </div>

          <div
            onClick={() => handleNavigate('knowledge-base')}
            className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow transition cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">全齡友善衛教知識庫</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              內建「長輩放大字體模式」，涵蓋黃疸觀察、安全睡眠、早產兒袋鼠護理與 8 大危險徵兆。
            </p>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================================================
  // PAGE 2: SDGs介紹 (SDGs 3.2.2 INTRODUCTION)
  // ==========================================================================
  const renderSdgsIntroPage = () => {
    const causes = [
      {
        title: '早產併發症 (Preterm Birth Complications)',
        pct: 36,
        color: 'bg-rose-500',
        desc: '胎齡未滿 37 週出生之嬰兒，常面臨呼吸窘迫症候群、體溫調節困難與腦室內出血風險，是全球新生兒死亡首要原因。'
      },
      {
        title: '分娩期相關併發症 (Intrapartum-related Events)',
        pct: 24,
        color: 'bg-amber-500',
        desc: '包含生產窒息（Birth Asphyxia）與產程創傷。透過訓練有素的助產人員與即時新生兒復甦術（NRP），多數可有效預防。'
      },
      {
        title: '新生兒敗血症與嚴重感染 (Sepsis & Infections)',
        pct: 16,
        color: 'bg-sky-500',
        desc: '包含肺炎、腦膜炎與臍帶感染。落實無菌接生、母乳哺餵與及早抗生素治療是關鍵防線。'
      },
      {
        title: '先天性異常與其他因素 (Congenital Anomalies & Others)',
        pct: 24,
        color: 'bg-indigo-500',
        desc: '包含先天性心臟病、神經管缺陷等，需要產前超音波篩檢、葉酸補充與高階新生兒外科手術介入。'
      }
    ];

    const milestones = [
      {
        year: '2000',
        title: '千禧年發展目標 (MDG 4) 啟動',
        desc: '聯合國設定 1990 至 2015 年間將 5 歲以下兒童死亡率降低三分之二，全球新生兒死亡率當時高達 30.2‰。'
      },
      {
        year: '2015',
        title: '聯合國通過 SDGs 永續發展目標',
        desc: '正式確立 SDG 3.2.2 指標：所有國家均需努力在 2030 年前將新生兒死亡率至少降至每千名活產 12 例以下。'
      },
      {
        year: '2020–2024',
        title: '全球加速行動與數位健康監測',
        desc: 'WHO 與 UNICEF 推動「每個新生兒行動計畫 (ENAP)」，全球新生兒死亡率降至 17.0‰，但區域不平等仍顯著。'
      },
      {
        year: '2030',
        title: 'SDGs 3.2.2 全球達標里程碑',
        desc: '目標讓全球超過 60 個尚未達標的國家加速縮小醫療資源落差，每年額外挽救超過 100 萬名新生兒生命。'
      }
    ];

    return (
      <div className="space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-lg bg-teal-600 text-white font-bold text-sm">SDG 3 健康與福祉</span>
            <span className="px-3 py-1 rounded-lg bg-sky-100 text-sky-800 font-bold text-sm">具體目標 Target 3.2</span>
            <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold text-sm">核心指標 Indicator 3.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            什麼是 SDGs 3.2.2「新生兒死亡率」指標？
          </h1>
          <p className="text-slate-600 leading-relaxed text-base">
            根據聯合國永續發展目標（SDGs）第 3 項「確保及促進各年齡層健康生活與福祉」，<strong>具體目標 3.2</strong> 要求在 2030 年前消除新生兒和五歲以下兒童可預防的死亡。其中 <strong>指標 3.2.2（Neonatal Mortality Rate, NMR）</strong> 明確定義為：
          </p>
          <div className="mt-5 p-5 rounded-xl bg-teal-50 border-l-4 border-teal-600">
            <p className="font-bold text-teal-950 text-base sm:text-lg">
              「在特定年份或時期內，每 1,000 名活產嬰兒中，於出生後前 28 個完整日內（0–27 天）死亡的人數，並要求各國於 2030 年前至少降至 12.0‰ 以下。」
            </p>
          </div>
        </div>

        {/* Why First 28 Days Matter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-extrabold text-lg mb-3">
              75%
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">首週死亡佔比高達四分之三</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              所有新生兒死亡中，有約 75% 發生在出生後的第一週內，且有將近 100 萬名新生兒在出生當天（24 小時內）即面臨生命危險。
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-extrabold text-lg mb-3">
              80%
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">多數死亡可透過基礎照護預防</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              透過產前檢查、專業人員接生、出生後立即肌膚接觸、純母乳哺餵及潔淨臍帶護理，超過 80% 的新生兒死亡是可以避免的。
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-lg mb-3">
              10x
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">全球區域醫療資源落差</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              出生在撒哈拉以南非洲或南亞高風險地區的新生兒，其死亡風險是高收入國家（如日本、台灣、北歐）新生兒的 10 倍以上。
            </p>
          </div>
        </div>

        {/* Causes & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Causes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-1">全球新生兒死亡四大主因分布</h2>
            <p className="text-xs text-slate-500 mb-5">資料來源：世界衛生組織 (WHO) 與聯合國兒童死亡率估算小組 (UN IGME)</p>
            <div className="space-y-5">
              {causes.map((c) => (
                <div key={c.title} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-800">{c.title}</span>
                    <span className="text-slate-900">{c.pct}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Milestones Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-1">全球新生兒健康治理重要里程碑</h2>
            <p className="text-xs text-slate-500 mb-5">從千禧年目標 (MDGs) 到永續發展目標 (SDGs 2030)</p>
            <div className="relative pl-6 border-l-2 border-teal-200 space-y-6">
              {milestones.map((m) => (
                <div key={m.year} className="relative">
                  <span className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full bg-teal-600 ring-4 ring-teal-50" />
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 font-bold text-xs mb-1">
                    {m.year} 年
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================================================
  // PAGE 3: 全球死亡率統計 (GLOBAL MORTALITY DATABASE)
  // ==========================================================================
  const [dbSearch, setDbSearch] = useState('');
  const [dbRegion, setDbRegion] = useState('ALL');
  const [dbStatus, setDbStatus] = useState('ALL');
  const [dbSortBy, setDbSortBy] = useState('nmr2024_asc');

  const renderGlobalStatsPage = () => {
    const regions = ['ALL', ...Array.from(new Set(countries.map((c) => c.region)))];

    const filteredCountries = countries
      .filter((c) => {
        const matchesQuery = c.name.toLowerCase().includes(dbSearch.toLowerCase()) || c.id.toLowerCase().includes(dbSearch.toLowerCase());
        const matchesRegion = dbRegion === 'ALL' || c.region === dbRegion;
        const matchesStatus = dbStatus === 'ALL' || c.status === dbStatus;
        return matchesQuery && matchesRegion && matchesStatus;
      })
      .sort((a, b) => {
        if (dbSortBy === 'nmr2024_asc') return a.nmr2024 - b.nmr2024;
        if (dbSortBy === 'nmr2024_desc') return b.nmr2024 - a.nmr2024;
        if (dbSortBy === 'reduction_desc') {
          const redA = ((a.nmr1990 - a.nmr2024) / a.nmr1990) * 100;
          const redB = ((b.nmr1990 - b.nmr2024) / b.nmr1990) * 100;
          return redB - redA;
        }
        return 0;
      });

    const handleExportCSV = () => {
      const headers = ['國家代碼,國家名稱,WHO區域,所得分類,1990年NMR,2015年NMR,2024年NMR,專業接生率(%),早產率(%),SDGs達標狀態'];
      const rows = filteredCountries.map(
        (c) =>
          `${c.id},"${c.name}",${c.region},${c.income},${c.nmr1990},${c.nmr2015},${c.nmr2024},${c.skilledBirth},${c.pretermRate},${c.status}`
      );
      const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'SDGs_3.2.2_全球新生兒死亡率資料庫.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      notify('已成功匯出 CSV 統計報表！');
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">全球新生兒死亡率資料庫 (UN IGME / WHO)</h1>
              <p className="text-sm text-slate-500 mt-1">
                查詢各國每千名活產新生兒死亡率 (NMR)、長期降幅與 SDGs 2030 (≤12.0‰) 達標進度
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              匯出 CSV 數據
            </button>
          </div>

          {/* Search & Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={dbSearch}
                onChange={(e) => setDbSearch(e.target.value)}
                placeholder="搜尋國家名稱或代碼 (如: 台灣, JPN)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <select
              value={dbRegion}
              onChange={(e) => setDbRegion(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r === 'ALL' ? '所有地理區域 (All Regions)' : r}
                </option>
              ))}
            </select>

            <select
              value={dbStatus}
              onChange={(e) => setDbStatus(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">所有達標狀態 (All Status)</option>
              <option value="已達標">已達標 (≤ 12.0‰)</option>
              <option value="進展順利">進展順利 (預計2030達標)</option>
              <option value="需加速推進">需加速推進</option>
            </select>

            <select
              value={dbSortBy}
              onChange={(e) => setDbSortBy(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="nmr2024_asc">排序：死亡率由低至高 (最佳表現)</option>
              <option value="nmr2024_desc">排序：死亡率由高至低 (高風險優先)</option>
              <option value="reduction_desc">排序：1990年以來總降幅最大</option>
            </select>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                  <th className="py-3.5 px-4">國家 / 代碼</th>
                  <th className="py-3.5 px-4">地理區域</th>
                  <th className="py-3.5 px-4 text-right">1990 基準</th>
                  <th className="py-3.5 px-4 text-right">2015 SDG起點</th>
                  <th className="py-3.5 px-4 text-right">最新 NMR (‰)</th>
                  <th className="py-3.5 px-4 text-right">累計降幅</th>
                  <th className="py-3.5 px-4 text-right">專業接生率</th>
                  <th className="py-3.5 px-4 text-center">SDGs 3.2.2 狀態</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredCountries.map((c) => {
                  const reduction = (((c.nmr1990 - c.nmr2024) / c.nmr1990) * 100).toFixed(1);
                  const badgeStyle =
                    c.status === '已達標'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : c.status === '進展順利'
                      ? 'bg-sky-100 text-sky-800 border-sky-200'
                      : 'bg-rose-100 text-rose-800 border-rose-200';
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {c.name}
                        <span className="ml-2 text-xs font-normal text-slate-400">{c.income}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{c.region}</td>
                      <td className="py-3.5 px-4 text-right text-slate-500">{c.nmr1990.toFixed(1)}‰</td>
                      <td className="py-3.5 px-4 text-right text-slate-600">{c.nmr2015.toFixed(1)}‰</td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">{c.nmr2024.toFixed(1)}‰</td>
                      <td className="py-3.5 px-4 text-right font-semibold text-teal-700">-{reduction}%</td>
                      <td className="py-3.5 px-4 text-right text-slate-700">{c.skilledBirth}%</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${badgeStyle}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filteredCountries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500">
                      找不到符合條件的國家資料，請調整搜尋或篩選條件。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================================================
  // PAGE 4: 國家比較分析 (COUNTRY COMPARISON ANALYSIS)
  // ==========================================================================
  const [selectedCountryIds, setSelectedCountryIds] = useState(['TWN', 'JPN', 'USA', 'IND']);

  const renderCountryComparePage = () => {
    const palette = ['#0d9488', '#2563eb', '#e11d48', '#f59e0b', '#7c3aed'];

    const toggleCountrySelection = (id) => {
      if (selectedCountryIds.includes(id)) {
        if (selectedCountryIds.length <= 2) {
          notify('請至少保留 2 個國家進行比較', 'warning');
          return;
        }
        setSelectedCountryIds(selectedCountryIds.filter((item) => item !== id));
      } else {
        if (selectedCountryIds.length >= 5) {
          notify('最多可同時比較 5 個國家', 'warning');
          return;
        }
        setSelectedCountryIds([...selectedCountryIds, id]);
      }
    };

    const selectedCountries = selectedCountryIds
      .map((id, idx) => {
        const found = countries.find((c) => c.id === id);
        return found ? { ...found, color: palette[idx % palette.length] } : null;
      })
      .filter(Boolean);

    return (
      <div className="space-y-6">
        {/* Country Selector Pill Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">多國新生兒照護與死亡率深度比較</h1>
              <p className="text-sm text-slate-500">點選下方國家標籤可自由切換比較組合（支援 2 至 5 國同步對照）</p>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800">
              已選取 {selectedCountries.length} / 5 國
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {countries.map((c) => {
              const activeIdx = selectedCountryIds.indexOf(c.id);
              const isSelected = activeIdx !== -1;
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCountrySelection(c.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected && (
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: palette[activeIdx % palette.length] }}
                    />
                  )}
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {selectedCountries.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-5 border-2 shadow-sm flex flex-col justify-between"
              style={{ borderColor: c.color }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{c.id}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      c.nmr2024 <= 12 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-4">{c.name}</h3>

                <div className="space-y-3 text-sm">
                  <div className="p-2.5 rounded-xl bg-slate-50">
                    <div className="text-xs text-slate-500">最新新生兒死亡率</div>
                    <div className="text-2xl font-extrabold" style={{ color: c.color }}>
                      {c.nmr2024} ‰
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-xs text-slate-500">專業人員接生率</span>
                    <span className="font-bold text-slate-800">{c.skilledBirth}%</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-xs text-slate-500">早產發生率</span>
                    <span className="font-bold text-slate-800">{c.pretermRate}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">醫療支出佔 GDP</span>
                    <span className="font-bold text-slate-800">{c.healthSpendPct}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Multi-Country Historical Trajectory & Structural Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-1">選定國家歷年死亡率走勢對比 (1990–2024)</h2>
            <p className="text-xs text-slate-500 mb-4">觀察各國自 1990 年至今的改善速度與 SDGs 12.0‰ 目標線距離</p>
            <MultiLineTrendChart
              seriesList={selectedCountries.map((c) => ({
                id: c.id,
                label: c.name,
                color: c.color,
                data: c.history
              }))}
            />
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">關鍵醫療照護覆蓋率對比</h2>
              <p className="text-xs text-slate-500">專業助產/醫療人員接生率 (%) — 決定分娩期安全的核心指標</p>
            </div>

            <div className="space-y-4">
              {selectedCountries.map((c) => (
                <div key={c.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">{c.name}</span>
                    <span className="text-slate-900">{c.skilledBirth}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${c.skilledBirth}%`, backgroundColor: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-900 leading-relaxed">
              <strong>跨國數據洞察：</strong> 當一國的「專業醫療人員接生率」達到 95% 以上且具備完善新生兒加護病房（NICU）轉診網時，新生兒死亡率普遍能穩定控制在 10‰ 以下。
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================================================
  // PAGE 5: 歷年趨勢圖 (HISTORICAL TRENDS)
  // ==========================================================================
  const [trendEra, setTrendEra] = useState('ALL');
  const [activeRegions, setActiveRegions] = useState(['global', 'ssa', 'csa', 'esea', 'ena']);

  const renderHistoricalTrendsPage = () => {
    const eraYearsMap = {
      ALL: [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2024],
      MDG: [1990, 1995, 2000, 2005, 2010, 2015],
      SDG: [2015, 2020, 2024]
    };

    const years = eraYearsMap[trendEra];
    const toggleRegion = (key) => {
      if (activeRegions.includes(key)) {
        if (activeRegions.length === 1) return;
        setActiveRegions(activeRegions.filter((r) => r !== key));
      } else {
        setActiveRegions([...activeRegions, key]);
      }
    };

    const seriesToRender = activeRegions.map((key) => ({
      id: key,
      ...GLOBAL_TREND_SERIES[key]
    }));

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">全球與各大洲歷年新生兒死亡率趨勢圖</h1>
              <p className="text-sm text-slate-500 mt-1">追蹤 1990 至 2024 年間全球五大區域演變與年均降幅 (ARR)</p>
            </div>

            {/* Era Filter Buttons */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              {[
                { id: 'ALL', label: '全時期 (1990–2024)' },
                { id: 'MDG', label: 'MDGs 時期 (1990–2015)' },
                { id: 'SDG', label: 'SDGs 時期 (2015–2024)' }
              ].map((era) => (
                <button
                  key={era.id}
                  onClick={() => setTrendEra(era.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    trendEra === era.id ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {era.label}
                </button>
              ))}
            </div>
          </div>

          {/* Series Toggle Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(GLOBAL_TREND_SERIES).map(([key, item]) => {
              const active = activeRegions.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleRegion(key)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                    active ? 'bg-white border-slate-300 text-slate-900 shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: active ? item.color : '#cbd5e1' }}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>

          <MultiLineTrendChart seriesList={seriesToRender} years={years} showTargetLine={true} />
        </div>

        {/* Regional ARR (Annual Rate of Reduction) Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(GLOBAL_TREND_SERIES).map(([key, item]) => {
            const val1990 = item.data[1990];
            const val2024 = item.data[2024];
            const totalDrop = (((val1990 - val2024) / val1990) * 100).toFixed(1);
            // Compound annual rate of reduction (1990 to 2024 = 34 years)
            const arr = ((1 - Math.pow(val2024 / val1990, 1 / 34)) * 100).toFixed(2);
            return (
              <div key={key} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <h3 className="font-bold text-slate-900 text-sm">{item.label}</h3>
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <div>
                    <div className="text-xs text-slate-500">1990 → 2024 變化</div>
                    <div className="text-lg font-extrabold text-slate-900">
                      {val1990}‰ → {val2024}‰
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">年均降幅 (ARR)</div>
                    <div className="text-lg font-extrabold text-teal-700">{arr}% / 年</div>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between text-xs text-slate-500">
                  <span>34年累計總降幅：-{totalDrop}%</span>
                  <span className={val2024 <= 12 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                    {val2024 <= 12 ? '已達 SDGs 目標' : `距目標差 ${(val2024 - 12).toFixed(1)}‰`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ==========================================================================
  // PAGE 6: 新生兒照護知識庫 (NEONATAL CARE KNOWLEDGE BASE)
  // ==========================================================================
  const [kbCategory, setKbCategory] = useState('ALL');
  const [kbSearch, setKbSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [checkedChecklist, setCheckedChecklist] = useState({});

  const renderKnowledgeBasePage = () => {
    const categories = ['ALL', '黃金28天日常照護', '餵養與營養', '黃疸與體溫監測', '危險徵兆辨識', '早產兒特別照護'];

    const filteredArticles = articles.filter((art) => {
      const matchCat = kbCategory === 'ALL' || art.category === kbCategory;
      const matchSearch =
        art.title.toLowerCase().includes(kbSearch.toLowerCase()) ||
        art.summary.toLowerCase().includes(kbSearch.toLowerCase());
      return matchCat && matchSearch;
    });

    const dailyChecklist = [
      '每次接觸寶寶或沖泡奶水前，已完成肥皂濕洗手 20 秒',
      '確認寶寶睡眠姿勢為「仰睡」，嬰兒床內無鬆軟枕頭、玩偶或厚棉被',
      '觀察今日尿布濕潤次數（出生第6天後每日應達 6 片以上）與大便顏色',
      '確認室內溫度維持在 24°C–26°C，寶寶後頸部溫暖無流汗或冰冷',
      '洗澡後已完成臍帶根部 75% 酒精乾燥護理，無紅腫異味'
    ];

    return (
      <div className="space-y-6">
        {/* Header & Elderly-Friendly Controls */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">新生兒照護知識庫（全齡友善衛教中心）</h1>
              <p className="text-sm text-slate-500 mt-1">
                專為新手爸媽、祖父母長輩與居家托育人員設計的實證照護指南
              </p>
            </div>
            <button
              onClick={() => setLargeTextMode(!largeTextMode)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border transition cursor-pointer ${
                largeTextMode
                  ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-sm'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Type className="w-4 h-4" />
              {largeTextMode ? '已開啟：長輩放大字體模式' : '切換：放大閱讀字體'}
            </button>
          </div>

          {/* Search & Category Tabs */}
          <div className="space-y-4">
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={kbSearch}
                onChange={(e) => setKbSearch(e.target.value)}
                placeholder="輸入關鍵字搜尋（如：黃疸、發燒、溢奶、臍帶、早產兒）..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setKbCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    kbCategory === cat
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? '全部衛教主題' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Article Cards Grid */}
          <div className="lg:col-span-8 space-y-4">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-teal-400 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 font-bold text-xs">
                    {art.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    適用對象：{art.audience} ・ 閱讀約 {art.readTime}
                  </span>
                </div>
                <h2 className={`font-extrabold text-slate-900 mb-2 ${largeTextMode ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
                  {art.title}
                </h2>
                <p className={`text-slate-600 leading-relaxed mb-4 ${largeTextMode ? 'text-base sm:text-lg' : 'text-sm'}`}>
                  {art.summary}
                </p>
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 cursor-pointer"
                >
                  閱讀完整照護重點 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Right: Interactive Daily Care Checklist */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <h3 className="font-extrabold text-slate-900 text-lg">每日居家照護自我檢核表</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">點擊勾選今日已完成的照護項目，降低新生兒居家風險：</p>

              <div className="space-y-3">
                {dailyChecklist.map((item, idx) => {
                  const checked = !!checkedChecklist[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => setCheckedChecklist({ ...checkedChecklist, [idx]: !checked })}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                        checked ? 'bg-teal-50/70 border-teal-300 text-teal-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                          checked ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white border-slate-300'
                        }`}
                      >
                        {checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`leading-snug ${largeTextMode ? 'text-base' : 'text-xs sm:text-sm'}`}>{item}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 p-4 rounded-xl bg-rose-50 border border-rose-200">
                <div className="flex items-center gap-2 font-bold text-rose-800 text-sm mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>24小時緊急醫療諮詢提醒</span>
                </div>
                <p className="text-xs text-rose-700 leading-relaxed">
                  若寶寶出現發燒（≥38°C）、低體溫（&lt;36°C）、呼吸急促或嘴唇發紫，請勿等待觀察，應立即前往設有小兒急診之醫院就醫。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-bold text-xs">
                    {selectedArticle.category}
                  </span>
                  <h2 className={`font-extrabold text-slate-900 mt-2 ${largeTextMode ? 'text-2xl' : 'text-xl'}`}>
                    {selectedArticle.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className={`text-slate-600 leading-relaxed mb-5 ${largeTextMode ? 'text-lg' : 'text-sm sm:text-base'}`}>
                {selectedArticle.summary}
              </p>

              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base">核心照護執行重點：</h3>
                <ul className="space-y-3">
                  {selectedArticle.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className={`text-slate-800 leading-relaxed ${largeTextMode ? 'text-lg' : 'text-sm'}`}>
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm cursor-pointer"
                >
                  我瞭解了，關閉視窗
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================================================
  // PAGE 7: 健康紀錄管理 (NEWBORN HEALTH RECORD MANAGEMENT)
  // ==========================================================================
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [recordForm, setRecordForm] = useState({
    babyName: '',
    birthDate: '2026-11-10',
    ageDays: 6,
    gestationalWeeks: 39,
    birthWeight: 3100,
    currentWeight: 3150,
    temperature: 36.8,
    feedingMl: 540,
    jaundiceLevel: '無明顯黃疸',
    notes: ''
  });

  const openAddRecord = () => {
    setEditingRecordId(null);
    setRecordForm({
      babyName: '',
      birthDate: '2026-11-10',
      ageDays: 6,
      gestationalWeeks: 39,
      birthWeight: 3100,
      currentWeight: 3150,
      temperature: 36.8,
      feedingMl: 540,
      jaundiceLevel: '無明顯黃疸',
      notes: ''
    });
    setShowRecordModal(true);
  };

  const openEditRecord = (rec) => {
    setEditingRecordId(rec.id);
    setRecordForm({ ...rec });
    setShowRecordModal(true);
  };

  const handleSaveRecord = (e) => {
    e.preventDefault();
    if (!recordForm.babyName.trim()) {
      notify('請輸入新生兒姓名或暱稱', 'warning');
      return;
    }
    const nowStr = '2026-11-16 21:40';
    if (editingRecordId) {
      setHealthRecords(
        healthRecords.map((r) => (r.id === editingRecordId ? { ...recordForm, id: editingRecordId, updatedAt: nowStr } : r))
      );
      notify('已更新新生兒健康照護紀錄！');
    } else {
      const newRec = {
        ...recordForm,
        id: `rec-${Date.now()}`,
        updatedAt: nowStr
      };
      setHealthRecords([newRec, ...healthRecords]);
      notify('已成功新增新生兒健康紀錄！');
    }
    setShowRecordModal(false);
  };

  const handleDeleteRecord = (id) => {
    setHealthRecords(healthRecords.filter((r) => r.id !== id));
    notify('已刪除該筆健康紀錄');
  };

  const renderHealthRecordsPage = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">新生兒健康紀錄管理系統</h1>
            <p className="text-sm text-slate-500 mt-1">
              完整追蹤黃金 28 天體重成長、體溫變化、每日奶量與黃疸狀態，系統自動進行生理異常偵測
            </p>
          </div>
          <button
            onClick={openAddRecord}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            新增健康紀錄
          </button>
        </div>

        {/* Records Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {healthRecords.map((rec) => {
            const status = evaluateRecordStatus(rec);
            const weightDelta = Number(rec.currentWeight) - Number(rec.birthWeight);
            const weightPct = ((weightDelta / Number(rec.birthWeight)) * 100).toFixed(1);

            return (
              <div key={rec.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-extrabold text-slate-900">{rec.babyName}</h3>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold">
                        出生第 {rec.ageDays} 天
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 text-xs font-bold">
                        胎齡 {rec.gestationalWeeks} 週
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      出生日期：{rec.birthDate} ・ 最後更新：{rec.updatedAt}
                    </p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${status.color}`}>
                    {status.level}
                  </span>
                </div>

                {/* Vital Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                      <Scale className="w-3.5 h-3.5 text-teal-600" />
                      <span>目前體重</span>
                    </div>
                    <div className="font-extrabold text-slate-900">{rec.currentWeight} g</div>
                    <div className={`text-[11px] font-semibold ${weightDelta >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {weightDelta >= 0 ? `+${weightDelta}g` : `${weightDelta}g`} ({weightPct}%)
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                      <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                      <span>量測體溫</span>
                    </div>
                    <div className="font-extrabold text-slate-900">{rec.temperature} °C</div>
                    <div className="text-[11px] text-slate-400">標準 36.5–37.5</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                      <Baby className="w-3.5 h-3.5 text-sky-600" />
                      <span>24h總奶量</span>
                    </div>
                    <div className="font-extrabold text-slate-900">{rec.feedingMl} ml</div>
                    <div className="text-[11px] text-slate-400">母乳/配方奶合計</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                      <Eye className="w-3.5 h-3.5 text-amber-500" />
                      <span>黃疸觀察</span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs mt-1">{rec.jaundiceLevel}</div>
                  </div>
                </div>

                {/* Automated Clinical Hint */}
                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 flex items-center justify-between gap-2">
                  <span>
                    <strong>系統評估提示：</strong> {status.hint}
                  </span>
                </div>

                {rec.notes && (
                  <p className="text-xs text-slate-600 bg-amber-50/40 p-3 rounded-xl border border-amber-100">
                    <strong>照護備註：</strong> {rec.notes}
                  </p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openEditRecord(rec)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> 編輯
                  </button>
                  <button
                    onClick={() => handleDeleteRecord(rec.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> 刪除
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add/Edit Modal */}
        {showRecordModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <form
              onSubmit={handleSaveRecord}
              className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900">
                  {editingRecordId ? '編輯新生兒健康紀錄' : '新增新生兒健康紀錄'}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowRecordModal(false)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">寶寶姓名 / 暱稱 *</label>
                  <input
                    type="text"
                    required
                    value={recordForm.babyName}
                    onChange={(e) => setRecordForm({ ...recordForm, babyName: e.target.value })}
                    placeholder="例如：王小晴 (女)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">出生日期</label>
                  <input
                    type="date"
                    value={recordForm.birthDate}
                    onChange={(e) => setRecordForm({ ...recordForm, birthDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">出生日齡 (天, 0–28)</label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={recordForm.ageDays}
                    onChange={(e) => setRecordForm({ ...recordForm, ageDays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">出生胎齡 (週)</label>
                  <input
                    type="number"
                    min="24"
                    max="43"
                    value={recordForm.gestationalWeeks}
                    onChange={(e) => setRecordForm({ ...recordForm, gestationalWeeks: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">出生體重 (公克 g)</label>
                  <input
                    type="number"
                    min="500"
                    max="6000"
                    value={recordForm.birthWeight}
                    onChange={(e) => setRecordForm({ ...recordForm, birthWeight: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">今日量測體重 (公克 g)</label>
                  <input
                    type="number"
                    min="500"
                    max="7000"
                    value={recordForm.currentWeight}
                    onChange={(e) => setRecordForm({ ...recordForm, currentWeight: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">今日體溫 (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="34.0"
                    max="41.0"
                    value={recordForm.temperature}
                    onChange={(e) => setRecordForm({ ...recordForm, temperature: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">24小時總奶量 (ml)</label>
                  <input
                    type="number"
                    min="0"
                    max="1500"
                    value={recordForm.feedingMl}
                    onChange={(e) => setRecordForm({ ...recordForm, feedingMl: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">黃疸膚色觀察</label>
                <select
                  value={recordForm.jaundiceLevel}
                  onChange={(e) => setRecordForm({ ...recordForm, jaundiceLevel: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="無明顯黃疸">無明顯黃疸</option>
                  <option value="輕微 (臉部)">輕微 (僅限臉部與眼白)</option>
                  <option value="中度 (延及胸部)">中度 (蔓延至胸部與上腹部)</option>
                  <option value="重度 (延及四肢手腳)">重度 (蔓延至大腿、小腿或手掌腳底)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">照護觀察備註</label>
                <textarea
                  rows={2}
                  value={recordForm.notes}
                  onChange={(e) => setRecordForm({ ...recordForm, notes: e.target.value })}
                  placeholder="記錄排便次數、睡眠情況或醫生叮嚀..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRecordModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm cursor-pointer"
                >
                  儲存健康紀錄
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };

  // ==========================================================================
  // PAGE 8: AI風險評估 (AI RISK PREDICTION)
  // ==========================================================================
  const [aiInput, setAiInput] = useState({
    gestationalAge: 38,
    birthWeight: 3050,
    apgar5Min: 9,
    temperature: 36.8,
    respiratoryRate: 42,
    feedingStatus: 'normal',
    jaundiceSeverity: 'none',
    prenatalCare: 'regular'
  });
  const [aiReportGenerated, setAiReportGenerated] = useState(true);

  const aiRiskAnalysis = useMemo(() => {
    let score = 5; // Baseline physiological risk
    const factors = [];

    // 1. Gestational Age
    if (aiInput.gestationalAge < 32) {
      score += 32;
      factors.push({ name: '極度早產 (<32週)', impact: '+32 分', desc: '器官發育尚未成熟，呼吸窘迫與感染風險極高' });
    } else if (aiInput.gestationalAge < 37) {
      score += 18;
      factors.push({ name: '中晚期早產 (32–36週)', impact: '+18 分', desc: '需密切監測體溫維持、血糖與吸吮協調度' });
    }

    // 2. Birth Weight
    if (aiInput.birthWeight < 1500) {
      score += 28;
      factors.push({ name: '極低出生體重 (<1500g)', impact: '+28 分', desc: '需新生兒加護病房 (NICU) 專業營養與生命支持' });
    } else if (aiInput.birthWeight < 2500) {
      score += 15;
      factors.push({ name: '低出生體重 (<2500g)', impact: '+15 分', desc: '建議實施袋鼠式護理並增加哺餵頻率' });
    }

    // 3. Apgar Score
    if (aiInput.apgar5Min <= 6) {
      score += 22;
      factors.push({ name: '5分鐘 Apgar 評分偏低 (≤6分)', impact: '+22 分', desc: '出生適應過程曾出現缺氧或活力不足，需神經發展追蹤' });
    } else if (aiInput.apgar5Min === 7) {
      score += 8;
      factors.push({ name: 'Apgar 評分臨界值 (7分)', impact: '+8 分', desc: '出生初期略需刺激與氧氣支持' });
    }

    // 4. Temperature
    if (aiInput.temperature >= 38.0 || aiInput.temperature < 36.0) {
      score += 25;
      factors.push({
        name: aiInput.temperature >= 38.0 ? '新生兒發燒 (≥38.0°C)' : '新生兒低體溫 (<36.0°C)',
        impact: '+25 分',
        desc: '為新生兒敗血症或嚴重感染之重要警訊，應立即醫療評估'
      });
    } else if (aiInput.temperature >= 37.6 || aiInput.temperature <= 36.3) {
      score += 10;
      factors.push({ name: '體溫處於臨界波動範圍', impact: '+10 分', desc: '請調整環境溫濕度與包覆衣物，1小時後複測' });
    }

    // 5. Respiratory Rate
    if (aiInput.respiratoryRate > 60 || aiInput.respiratoryRate < 30) {
      score += 22;
      factors.push({ name: '呼吸速率異常 (>60 或 <30 次/分)', impact: '+22 分', desc: '疑似呼吸急促或呼吸暫停風險，需觀察有無胸凹現象' });
    }

    // 6. Feeding Status
    if (aiInput.feedingStatus === 'refusing') {
      score += 20;
      factors.push({ name: '拒食或吸吮明顯無力', impact: '+20 分', desc: '易導致低血糖與脫水，亦可能是全身性感染前兆' });
    } else if (aiInput.feedingStatus === 'reduced') {
      score += 10;
      factors.push({ name: '奶量攝取減少約 30%', impact: '+10 分', desc: '需紀錄濕尿布片數並採少量多餐哺餵' });
    }

    // 7. Jaundice
    if (aiInput.jaundiceSeverity === 'severe') {
      score += 20;
      factors.push({ name: '重度黃疸蔓延至四肢', impact: '+20 分', desc: '高膽紅素血症恐引發核黃疸風險，需立即檢測血清膽紅素' });
    } else if (aiInput.jaundiceSeverity === 'moderate') {
      score += 9;
      factors.push({ name: '中度黃疸 (延及軀幹)', impact: '+9 分', desc: '建議安排小兒科經皮黃疸儀檢測' });
    }

    // 8. Prenatal Care
    if (aiInput.prenatalCare === 'none') {
      score += 12;
      factors.push({ name: '產前檢查不完整', impact: '+12 分', desc: '缺乏完整母體乙型鏈球菌 (GBS) 與先天感染篩檢資訊' });
    }

    const finalScore = Math.min(score, 98);
    let tier = '低風險 (Low Risk)';
    let colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    let barColor = 'bg-emerald-500';
    let actionPlan = [
      '維持每 2–3 小時規律母乳或配方奶哺餵，每日記錄尿布濕潤次數。',
      '落實仰睡安全睡眠環境，室溫保持 24°C–26°C。',
      '依照兒童健康手冊時程完成滿月健檢與常規疫苗接種。'
    ];

    if (finalScore >= 55) {
      tier = '高風險警示 (High Risk)';
      colorClass = 'text-rose-700 bg-rose-50 border-rose-200';
      barColor = 'bg-rose-600';
      actionPlan = [
        '【緊急建議】請立即攜帶寶寶前往設有小兒科急診或新生兒加護病房之醫療院所就診。',
        '就醫途中注意保暖（避免體溫繼續下降），並保持呼吸道暢通，切勿強行灌食。',
        '向醫師清楚說明出生週數、體重、最近一次進食時間與體溫變化。'
      ];
    } else if (finalScore >= 25) {
      tier = '中度風險 (Moderate Risk)';
      colorClass = 'text-amber-800 bg-amber-50 border-amber-200';
      barColor = 'bg-amber-500';
      actionPlan = [
        '建議於 12–24 小時內預約小兒科門診進行專業理學檢查與黃疸/體重評估。',
        '每 2 小時複測一次體溫，並詳細記錄每餐奶量（ml）與排泄狀況。',
        '若期間出現發燒 ≥38°C、呼吸急促或嗜睡叫不醒，請立即轉往急診。'
      ];
    }

    return { score: finalScore, tier, colorClass, barColor, factors, actionPlan };
  }, [aiInput]);

  const applyPresetScenario = (type) => {
    if (type === 'healthy') {
      setAiInput({
        gestationalAge: 39,
        birthWeight: 3200,
        apgar5Min: 9,
        temperature: 36.8,
        respiratoryRate: 40,
        feedingStatus: 'normal',
        jaundiceSeverity: 'none',
        prenatalCare: 'regular'
      });
    } else if (type === 'moderate') {
      setAiInput({
        gestationalAge: 36,
        birthWeight: 2350,
        apgar5Min: 8,
        temperature: 36.3,
        respiratoryRate: 52,
        feedingStatus: 'reduced',
        jaundiceSeverity: 'moderate',
        prenatalCare: 'regular'
      });
    } else if (type === 'high') {
      setAiInput({
        gestationalAge: 33,
        birthWeight: 1850,
        apgar5Min: 6,
        temperature: 35.8,
        respiratoryRate: 66,
        feedingStatus: 'refusing',
        jaundiceSeverity: 'severe',
        prenatalCare: 'none'
      });
    }
    setAiReportGenerated(true);
    notify('已套用模擬情境參數並更新 AI 風險報告');
  };

  const renderAiRiskPage = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>多因子臨床決策支持模型 (Neonatal Risk Stratification AI)</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">AI 新生兒健康風險智慧評估引擎</h1>
              <p className="text-sm text-slate-500 mt-1">
                輸入出生指標與即時生理徵象，AI 即時計算風險指數、拆解關鍵風險因子並提供分級照護建議
              </p>
            </div>

            {/* Quick Test Scenarios */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPresetScenario('healthy')}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 cursor-pointer"
              >
                範例：健康足月兒
              </button>
              <button
                onClick={() => applyPresetScenario('moderate')}
                className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 cursor-pointer"
              >
                範例：晚期早產觀察
              </button>
              <button
                onClick={() => applyPresetScenario('high')}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 cursor-pointer"
              >
                範例：高風險緊急警訊
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Parameter Inputs */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              步驟一：輸入新生兒出生與即時生理參數
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>出生胎齡 (週)</span>
                  <span className="text-teal-700">{aiInput.gestationalAge} 週</span>
                </label>
                <input
                  type="range"
                  min="26"
                  max="42"
                  value={aiInput.gestationalAge}
                  onChange={(e) => setAiInput({ ...aiInput, gestationalAge: Number(e.target.value) })}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>26週 (極早產)</span>
                  <span>37週 (足月)</span>
                  <span>42週</span>
                </div>
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>出生體重 (公克)</span>
                  <span className="text-teal-700">{aiInput.birthWeight} g</span>
                </label>
                <input
                  type="range"
                  min="900"
                  max="4500"
                  step="50"
                  value={aiInput.birthWeight}
                  onChange={(e) => setAiInput({ ...aiInput, birthWeight: Number(e.target.value) })}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>900g</span>
                  <span>2500g (標準線)</span>
                  <span>4500g</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">5分鐘 Apgar 新生兒活力評分</label>
                <select
                  value={aiInput.apgar5Min}
                  onChange={(e) => setAiInput({ ...aiInput, apgar5Min: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value={10}>10 分 (活力極佳)</option>
                  <option value={9}>9 分 (正常優良)</option>
                  <option value={8}>8 分 (正常)</option>
                  <option value={7}>7 分 (輕度適應不良)</option>
                  <option value={6}>6 分及以下 (需醫療處置)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">目前量測體溫 (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  min="34.0"
                  max="41.0"
                  value={aiInput.temperature}
                  onChange={(e) => setAiInput({ ...aiInput, temperature: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">呼吸速率 (次 / 分鐘)</label>
                <input
                  type="number"
                  min="15"
                  max="90"
                  value={aiInput.respiratoryRate}
                  onChange={(e) => setAiInput({ ...aiInput, respiratoryRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
                <span className="text-[11px] text-slate-400">正常新生兒約 30–60 次/分</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">進食與吸吮狀況</label>
                <select
                  value={aiInput.feedingStatus}
                  onChange={(e) => setAiInput({ ...aiInput, feedingStatus: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="normal">吸吮有力，奶量正常</option>
                  <option value="reduced">食慾略減，奶量下降約 30%</option>
                  <option value="refusing">拒食、吸吮無力或頻繁嘔吐</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">黃疸皮膚觀察範圍</label>
                <select
                  value={aiInput.jaundiceSeverity}
                  onChange={(e) => setAiInput({ ...aiInput, jaundiceSeverity: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="none">無或僅輕微臉部泛黃</option>
                  <option value="moderate">中度（蔓延至胸部/腹部）</option>
                  <option value="severe">重度（蔓延至四肢手腳）</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">母體產前檢查完整度</label>
                <select
                  value={aiInput.prenatalCare}
                  onChange={(e) => setAiInput({ ...aiInput, prenatalCare: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="regular">完整定期產檢</option>
                  <option value="none">未定期產檢 / 資訊缺漏</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right: Real-Time AI Risk Output */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">步驟二：AI 即時風險分級與因子解析</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${aiRiskAnalysis.colorClass}`}>
                  {aiRiskAnalysis.tier}
                </span>
              </div>

              {/* Risk Score Gauge */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-bold text-slate-600">綜合臨床風險指數 (Risk Index)</span>
                  <span className="text-3xl font-extrabold text-slate-900">{aiRiskAnalysis.score} / 100</span>
                </div>
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${aiRiskAnalysis.barColor}`}
                    style={{ width: `${aiRiskAnalysis.score}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1.5">
                  <span>0–24 低風險</span>
                  <span>25–54 中度觀察</span>
                  <span>55–100 高風險緊急轉診</span>
                </div>
              </div>

              {/* Contributing Factors */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2.5">AI 偵測之關鍵風險貢獻因子：</h3>
                {aiRiskAnalysis.factors.length === 0 ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>目前未偵測到顯著生理異常因子，各項指標均符合健康足月新生兒預期範圍。</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {aiRiskAnalysis.factors.map((f, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{f.name}</div>
                          <div className="text-xs text-slate-600 mt-0.5">{f.desc}</div>
                        </div>
                        <span className="shrink-0 px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-xs">
                          {f.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actionable Recommendations */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">個人化照護與就醫行動建議：</h3>
                <ul className="space-y-2">
                  {aiRiskAnalysis.actionPlan.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <ChevronRight className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              醫療免責聲明：本 AI 風險評估模型係依據 WHO 新生兒整合照護準則 (IMNCI) 建構之輔助篩檢工具，不可取代專業小兒科醫師之現場臨床診斷。
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================================================
  // PAGE 9: SDGs達標預測 (SDGs 2030 TARGET ACHIEVEMENT PREDICTION)
  // ==========================================================================
  const [predCountryId, setPredCountryId] = useState('IND');
  const [boostSkilledBirth, setBoostSkilledBirth] = useState(5);
  const [boostNicu, setBoostNicu] = useState(10);
  const [boostInfectionCtrl, setBoostInfectionCtrl] = useState(8);

  const renderSdgsPredictionPage = () => {
    const targetCountry = countries.find((c) => c.id === predCountryId) || countries[0];

    // Calculate baseline historical ARR (2015 to 2024 = 9 years)
    const baseArr = 1 - Math.pow(targetCountry.nmr2024 / targetCountry.nmr2015, 1 / 9);
    // Policy intervention bonus ARR
    const interventionBonus = boostSkilledBirth * 0.0022 + boostNicu * 0.0025 + boostInfectionCtrl * 0.0018;
    const projectedArr = Math.min(baseArr + interventionBonus, 0.14);

    const projYears = [2024, 2026, 2028, 2030, 2032, 2035];
    const baselineSeries = {};
    const policySeries = {};

    projYears.forEach((yr) => {
      const elapsed = yr - 2024;
      baselineSeries[yr] = Number((targetCountry.nmr2024 * Math.pow(1 - baseArr, elapsed)).toFixed(1));
      policySeries[yr] = Number((targetCountry.nmr2024 * Math.pow(1 - projectedArr, elapsed)).toFixed(1));
    });

    const nmr2030Base = baselineSeries[2030];
    const nmr2030Policy = policySeries[2030];
    const willAchieve2030 = nmr2030Policy <= 12.0;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">SDGs 3.2.2 (2030 達標軌跡預測模擬器)</h1>
              <p className="text-sm text-slate-500 mt-1">
                選擇目標國家並調整公共衛生政策投資強度，模擬 2024–2035 年新生兒死亡率下降曲線與達標年份
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-600">選擇預測國家：</label>
              <select
                value={predCountryId}
                onChange={(e) => setPredCountryId(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (現況 {c.nmr2024}‰)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Policy Intervention Sliders */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-bold text-slate-900">公共衛生介入政策強度調整</h2>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">1. 提升專業助產與產前照護覆蓋率</span>
                  <span className="text-teal-700">+{boostSkilledBirth}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={boostSkilledBirth}
                  onChange={(e) => setBoostSkilledBirth(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <p className="text-[11px] text-slate-400">強化偏鄉產科診所與緊急產科轉診系統</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">2. 擴增新生兒加護病房 (NICU) 與早產照護</span>
                  <span className="text-teal-700">+{boostNicu}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={boostNicu}
                  onChange={(e) => setBoostNicu(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <p className="text-[11px] text-slate-400">導入呼吸輔助設備、保溫箱與袋鼠式護理推廣</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">3. 新生兒敗血症防治與純母乳哺餵計畫</span>
                  <span className="text-teal-700">+{boostInfectionCtrl}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={boostInfectionCtrl}
                  onChange={(e) => setBoostInfectionCtrl(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <p className="text-[11px] text-slate-400">落實無菌接生包、臍帶消毒與出生1小時內早接觸</p>
              </div>
            </div>

            {/* Prediction Outcome Summary */}
            <div
              className={`p-4 rounded-2xl border ${
                willAchieve2030 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600">2030 年預測死亡率 (介入後)</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                    willAchieve2030 ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                  }`}
                >
                  {willAchieve2030 ? '預計順利達標 (≤12.0‰)' : '仍需更高強度資源投入'}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">{nmr2030Policy} ‰</span>
                <span className="text-xs text-slate-600">
                  (若維持現狀基準線則為 <strong>{nmr2030Base}‰</strong>)
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-2">
                年均死亡率降幅 (ARR) 由原本的 <strong>{(baseArr * 100).toFixed(2)}%</strong> 提升至{' '}
                <strong>{(projectedArr * 100).toFixed(2)}%</strong>。
              </p>
            </div>
          </div>

          {/* Right: Forecast Chart */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {targetCountry.name}：2024–2035 新生兒死亡率預測軌跡
            </h2>
            <p className="text-xs text-slate-500 mb-4">比較「維持現狀趨勢 (灰藍色)」與「加強衛生政策介入 (翠綠色)」</p>

            <MultiLineTrendChart
              years={projYears}
              seriesList={[
                { id: 'base', label: '維持現狀基準線 (Baseline)', color: '#64748b', data: baselineSeries },
                { id: 'policy', label: '政策加速介入預測 (Projected)', color: '#0d9488', data: policySeries }
              ]}
            />

            <div className="flex flex-wrap gap-5 mt-4 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-500"></span>
                <span>維持現狀趨勢 (2030預測：{nmr2030Base}‰)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-600"></span>
                <span className="font-bold text-teal-800">政策介入後軌跡 (2030預測：{nmr2030Policy}‰)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================================================
  // PAGE 10: 後台管理系統 (ADMIN MANAGEMENT SYSTEM)
  // ==========================================================================
  const [adminSubTab, setAdminSubTab] = useState('articles');
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleCat, setNewArticleCat] = useState('黃金28天日常照護');
  const [newArticleSummary, setNewArticleSummary] = useState('');

  const [newCountryCode, setNewCountryCode] = useState('');
  const [newCountryName, setNewCountryName] = useState('');
  const [newCountryRegion, setNewCountryRegion] = useState('東亞與東南亞');
  const [newCountryNmr, setNewCountryNmr] = useState('');

  const handlePublishArticle = (e) => {
    e.preventDefault();
    if (!newArticleTitle.trim() || !newArticleSummary.trim()) return;
    const created = {
      id: `art-${Date.now()}`,
      category: newArticleCat,
      title: newArticleTitle,
      readTime: '3 分鐘',
      audience: '全齡照護者',
      summary: newArticleSummary,
      keyPoints: [newArticleSummary, '如有任何疑問請諮詢小兒科醫師或撥打孕產婦關懷專線。'],
      date: '2026-11-16'
    };
    setArticles([created, ...articles]);
    setAdminLogs([
      {
        id: `log-${Date.now()}`,
        time: '2026-11-16 21:40',
        type: '知識庫發布',
        user: '系統管理員',
        detail: `發布新衛教文章《${newArticleTitle}》`,
        severity: 'low'
      },
      ...adminLogs
    ]);
    setNewArticleTitle('');
    setNewArticleSummary('');
    notify('已成功發布新衛教文章至知識庫！');
  };

  const handleAddCountryData = (e) => {
    e.preventDefault();
    const nmrVal = parseFloat(newCountryNmr);
    if (!newCountryCode.trim() || !newCountryName.trim() || isNaN(nmrVal)) return;
    const status = nmrVal <= 12 ? '已達標' : nmrVal <= 18 ? '進展順利' : '需加速推進';
    const created = {
      id: newCountryCode.toUpperCase(),
      name: newCountryName,
      region: newCountryRegion,
      income: nmrVal <= 10 ? '高收入' : '中低收入',
      nmr2024: nmrVal,
      nmr2015: Number((nmrVal * 1.25).toFixed(1)),
      nmr2000: Number((nmrVal * 1.8).toFixed(1)),
      nmr1990: Number((nmrVal * 2.4).toFixed(1)),
      skilledBirth: nmrVal <= 12 ? 98.5 : 82.0,
      pretermRate: 9.8,
      healthSpendPct: 5.5,
      annualBirthsK: 500,
      status,
      history: {
        1990: Number((nmrVal * 2.4).toFixed(1)),
        1995: Number((nmrVal * 2.1).toFixed(1)),
        2000: Number((nmrVal * 1.8).toFixed(1)),
        2005: Number((nmrVal * 1.6).toFixed(1)),
        2010: Number((nmrVal * 1.4).toFixed(1)),
        2015: Number((nmrVal * 1.25).toFixed(1)),
        2020: Number((nmrVal * 1.1).toFixed(1)),
        2024: nmrVal
      }
    };
    setCountries([created, ...countries]);
    setAdminLogs([
      {
        id: `log-${Date.now()}`,
        time: '2026-11-16 21:40',
        type: '資料庫更新',
        user: '系統管理員',
        detail: `新增國家指標數據：${newCountryName} (${nmrVal}‰)`,
        severity: 'low'
      },
      ...adminLogs
    ]);
    setNewCountryCode('');
    setNewCountryName('');
    setNewCountryNmr('');
    notify(`已將「${newCountryName}」寫入全球死亡率資料庫！`);
  };

  const renderAdminPage = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">後台管理系統 (Platform CMS & Data Governance)</h1>
              <p className="text-sm text-slate-500 mt-1">
                維護全球死亡率資料庫、審核發布新生兒照護衛教文章與監控 AI 風險評估日誌
              </p>
            </div>

            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              {[
                { id: 'articles', label: `知識庫管理 (${articles.length})` },
                { id: 'database', label: `死亡率資料庫 (${countries.length})` },
                { id: 'logs', label: `系統與預警日誌 (${adminLogs.length})` }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAdminSubTab(t.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    adminSubTab === t.id ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-Tab 1: Knowledge Base CMS */}
        {adminSubTab === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handlePublishArticle}
              className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 h-fit"
            >
              <h2 className="text-lg font-bold text-slate-900">發布新衛教知識文章</h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">文章標題 *</label>
                <input
                  type="text"
                  required
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  placeholder="輸入衛教文章標題..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">照護分類</label>
                <select
                  value={newArticleCat}
                  onChange={(e) => setNewArticleCat(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="黃金28天日常照護">黃金28天日常照護</option>
                  <option value="餵養與營養">餵養與營養</option>
                  <option value="黃疸與體溫監測">黃疸與體溫監測</option>
                  <option value="危險徵兆辨識">危險徵兆辨識</option>
                  <option value="早產兒特別照護">早產兒特別照護</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">內容摘要與照護重點 *</label>
                <textarea
                  rows={4}
                  required
                  value={newArticleSummary}
                  onChange={(e) => setNewArticleSummary(e.target.value)}
                  placeholder="輸入適合新手父母與長輩閱讀的照護指導內容..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm cursor-pointer"
              >
                立即發布至知識庫
              </button>
            </form>

            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900 mb-2">已上架衛教文章列表</h2>
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-xs font-bold text-teal-700">{art.category}</span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">{art.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{art.summary}</p>
                  </div>
                  <button
                    onClick={() => {
                      setArticles(articles.filter((a) => a.id !== art.id));
                      notify('已下架並移除該文章');
                    }}
                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 shrink-0 cursor-pointer"
                    title="刪除文章"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sub-Tab 2: Mortality Dataset Management */}
        {adminSubTab === 'database' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleAddCountryData}
              className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 h-fit"
            >
              <h2 className="text-lg font-bold text-slate-900">新增國家統計數據</h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ISO 三碼國家代碼 *</label>
                <input
                  type="text"
                  maxLength={3}
                  required
                  value={newCountryCode}
                  onChange={(e) => setNewCountryCode(e.target.value)}
                  placeholder="例如：KOR"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">國家名稱 *</label>
                <input
                  type="text"
                  required
                  value={newCountryName}
                  onChange={(e) => setNewCountryName(e.target.value)}
                  placeholder="例如：南韓 (South Korea)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">地理區域</label>
                <select
                  value={newCountryRegion}
                  onChange={(e) => setNewCountryRegion(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="東亞與東南亞">東亞與東南亞</option>
                  <option value="歐洲與北美">歐洲與北美</option>
                  <option value="中亞與南亞">中亞與南亞</option>
                  <option value="撒哈拉以南非洲">撒哈拉以南非洲</option>
                  <option value="拉丁美洲與加勒比海">拉丁美洲與加勒比海</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">最新新生兒死亡率 (‰) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newCountryNmr}
                  onChange={(e) => setNewCountryNmr(e.target.value)}
                  placeholder="例如：1.5"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm cursor-pointer"
              >
                新增至全球資料庫
              </button>
            </form>

            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-x-auto">
              <h2 className="text-lg font-bold text-slate-900 mb-3">資料庫國家清單維護</h2>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500">
                    <th className="py-2.5 px-3">代碼</th>
                    <th className="py-2.5 px-3">國家名稱</th>
                    <th className="py-2.5 px-3">區域</th>
                    <th className="py-2.5 px-3 text-right">最新 NMR</th>
                    <th className="py-2.5 px-3 text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {countries.map((c) => (
                    <tr key={c.id}>
                      <td className="py-2.5 px-3 font-bold">{c.id}</td>
                      <td className="py-2.5 px-3">{c.name}</td>
                      <td className="py-2.5 px-3 text-slate-500">{c.region}</td>
                      <td className="py-2.5 px-3 text-right font-bold">{c.nmr2024}‰</td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => {
                            if (countries.length <= 3) return;
                            setCountries(countries.filter((item) => item.id !== c.id));
                            notify(`已移除 ${c.name} 紀錄`);
                          }}
                          className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                        >
                          移除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sub-Tab 3: System & AI Alert Logs */}
        {adminSubTab === 'logs' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-slate-900 mb-2">即時系統稽核與 AI 風險預警日誌</h2>
            {adminLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        log.severity === 'high'
                          ? 'bg-rose-100 text-rose-800'
                          : log.severity === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {log.type}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{log.user}</span>
                    <span className="text-xs text-slate-400">{log.time}</span>
                  </div>
                  <p className="text-sm text-slate-800">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ==========================================================================
  // MAIN SHELL LAYOUT (Sidebar + Top Header + Content Area)
  // ==========================================================================
  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 flex ${largeTextMode ? 'text-base' : 'text-sm'}`}>
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-xl border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Persistent Left Navigation Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-sky-700 text-white flex items-center justify-center shadow-sm">
              <Baby className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm leading-tight">SDGs 3.2.2 智慧平台</div>
              <div className="text-[11px] font-semibold text-teal-700">新生兒照護與死亡率分析</div>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-3.5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-left transition cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-900">
              <Target className="w-4 h-4 text-teal-600" />
              <span>2030 全球核心目標</span>
            </div>
            <p className="text-[11px] text-teal-800 leading-relaxed">
              將各國新生兒死亡率降至 <strong>≤ 12.0‰</strong>，確保每位新生兒享有平等優質的健康起點。
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              aria-label="開啟導覽選單"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
              <span className="hidden sm:inline font-medium">SDGs 3.2.2 智慧分析平台</span>
              <ChevronRight className="hidden sm:inline w-4 h-4 text-slate-400" />
              <span className="font-extrabold text-slate-900">
                {navItems.find((n) => n.id === activeTab)?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setLargeTextMode(!largeTextMode)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                largeTextMode
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="調整全站字體大小，方便長輩與照護者閱讀"
            >
              <Type className="w-3.5 h-3.5" />
              <span>{largeTextMode ? '放大字體：開' : '放大字體'}</span>
            </button>

            <button
              onClick={() => handleNavigate('ai-risk')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>AI 風險快篩</span>
            </button>
          </div>
        </header>

        {/* Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'home' && renderHomePage()}
          {activeTab === 'sdgs-intro' && renderSdgsIntroPage()}
          {activeTab === 'global-stats' && renderGlobalStatsPage()}
          {activeTab === 'country-compare' && renderCountryComparePage()}
          {activeTab === 'historical-trends' && renderHistoricalTrendsPage()}
          {activeTab === 'knowledge-base' && renderKnowledgeBasePage()}
          {activeTab === 'health-records' && renderHealthRecordsPage()}
          {activeTab === 'ai-risk' && renderAiRiskPage()}
          {activeTab === 'sdgs-prediction' && renderSdgsPredictionPage()}
          {activeTab === 'admin' && renderAdminPage()}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-500">
          SDGs 3.2.2 新生兒照護與死亡率智慧分析平台 ｜ 數據參考 UN IGME、WHO 與各國衛生統計年報，致力於全齡友善母嬰健康促進
        </footer>
      </div>
    </div>
  );
}