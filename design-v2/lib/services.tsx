import { Activity, Sparkles, HeartPulse, Scissors, Stethoscope, Award, type LucideIcon } from 'lucide-react';

export type Service = {
  slug: string;
  title: string;
  Icon: LucideIcon;
  tagline: string;
  short: string;
  overview: string;
  treats: string[];
  features: string[];
  process: { n: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'varicose-veins',
    title: 'Varicose Veins',
    Icon: Activity,
    tagline: 'Walk-in, walk-out treatment for swollen, bulging veins.',
    short: 'Minimally invasive walk-in, walk-out treatments with proven results.',
    overview:
      'Varicose veins are large, twisted veins caused by underlying venous insufficiency. We use modern, minimally invasive techniques — no general anaesthetic — to close or remove diseased veins and restore healthy circulation.',
    treats: [
      'Aching, heavy or tired legs',
      'Bulging, twisted veins under the skin',
      'Swelling around the ankles',
      'Night cramps and restless legs',
      'Skin discoloration or itching',
    ],
    features: [
      'Endovenous laser ablation',
      'Sclerotherapy injections',
      'Ambulatory phlebectomy',
      'Comprehensive vein evaluation',
    ],
    process: [
      { n: '01', title: 'Consultation & Doppler',  desc: 'A full evaluation of your venous system using ultrasound to map the affected veins.' },
      { n: '02', title: 'Personalised plan',       desc: 'Treatment options matched to your vein size, severity and medical aid.' },
      { n: '03', title: 'Procedure',                desc: 'A 30–60 minute walk-in, walk-out procedure under local anaesthetic.' },
      { n: '04', title: 'Recovery',                 desc: 'Most patients return to light activity the same day with compression stockings.' },
    ],
    faq: [
      { q: 'Will I need general anaesthetic?',  a: 'No. All procedures are performed under local anaesthetic, so you stay awake and go home the same day.' },
      { q: 'How long is recovery?',             a: 'Most patients return to light activity the same day. You will wear compression stockings for a short period.' },
      { q: 'Will my medical aid cover this?',   a: 'Most major South African medical aids cover medically indicated varicose vein treatment. We will confirm coverage before the procedure.' },
    ],
  },

  {
    slug: 'spider-veins',
    title: 'Spider Veins',
    Icon: Sparkles,
    tagline: 'Clear, healthier skin — removing thread and spider veins.',
    short: 'Effective removal of spider and thread veins for clearer, healthier skin.',
    overview:
      'Spider veins are the small, web-like veins that appear close to the skin surface on the legs or face. Our targeted sclerotherapy and laser treatments fade them gently, with minimal downtime and quick visible results.',
    treats: [
      'Visible thread veins on the legs',
      'Spider veins on the face or cheeks',
      'Broken capillaries',
      'Cosmetic vein concerns',
    ],
    features: [
      'Sclerotherapy treatment',
      'Laser vein removal',
      'Cosmetic vein therapy',
      'Quick recovery time',
    ],
    process: [
      { n: '01', title: 'Skin assessment',  desc: 'We confirm spider veins (not deeper varicose veins) and pick the right modality for your skin type.' },
      { n: '02', title: 'Treatment session', desc: 'Sclerotherapy injections or laser session — typically 20–40 minutes.' },
      { n: '03', title: 'Light recovery',    desc: 'Mild redness for a day or two. Most people return to normal activity immediately.' },
      { n: '04', title: 'Follow-up',         desc: 'A short review session to assess results — most areas need 1–3 sessions in total.' },
    ],
    faq: [
      { q: 'How many sessions are needed?',  a: 'Most areas clear in 1–3 sessions, depending on the size and density of the veins.' },
      { q: 'Are results permanent?',         a: 'Treated veins are permanently removed. New spider veins can still appear elsewhere over time.' },
      { q: 'Is the treatment painful?',      a: 'Most patients describe only a brief stinging sensation. No anaesthetic is usually required.' },
    ],
  },

  {
    slug: 'aesthetics',
    title: 'Aesthetic Services',
    Icon: HeartPulse,
    tagline: 'Professional cosmetic care, grounded in medical expertise.',
    short: 'Professional cosmetic procedures backed by medical expertise.',
    overview:
      'Aesthetic care delivered by a medically trained team. Our non-surgical treatments are designed to refresh and rejuvenate — clinical standards first, cosmetic outcomes always.',
    treats: [
      'Signs of skin aging',
      'Uneven skin texture and tone',
      'Cosmetic concerns alongside vein treatment',
      'General aesthetic refresh',
    ],
    features: [
      'Cosmetic consultations',
      'Non-surgical treatments',
      'Skin rejuvenation',
      'Professional aesthetic care',
    ],
    process: [
      { n: '01', title: 'Consultation',          desc: 'We discuss your goals, skin history and medical context to design a safe plan.' },
      { n: '02', title: 'Personalised plan',     desc: 'A treatment sequence tailored to your skin and budget.' },
      { n: '03', title: 'Treatment',             desc: 'Performed in our lounge setting with a focus on comfort and safety.' },
      { n: '04', title: 'Review',                desc: 'A follow-up session to assess results and plan any maintenance.' },
    ],
    faq: [
      { q: 'Is this covered by medical aid?',    a: 'Cosmetic aesthetic treatments are usually private. Some procedures with a medical indication may be covered — we will advise on a case-by-case basis.' },
      { q: 'How long do results last?',          a: 'Results vary by treatment. We will give you a clear timeline during your consultation.' },
      { q: 'Can I combine this with vein treatment?', a: 'Yes — many patients combine aesthetic treatments with spider-vein or varicose-vein procedures.' },
    ],
  },

  {
    slug: 'venous-ulcers',
    title: 'Venous Ulcers',
    Icon: Scissors,
    tagline: 'Specialised care for chronic leg ulcers and slow-healing wounds.',
    short: 'Specialised treatment for chronic ulcers and comprehensive wound care.',
    overview:
      'Chronic venous ulcers are often caused by long-standing venous insufficiency. We diagnose and treat the underlying cause as well as the wound itself, combining wound care with compression therapy and root-cause vein treatment.',
    treats: [
      'Chronic leg ulcers that fail to heal',
      'Slow-healing wounds on the lower leg',
      'Recurrent ulceration',
      'Chronic leg swelling',
    ],
    features: [
      'Ulcer assessment and grading',
      'Compression therapy',
      'Wound care management',
      'Preventive care planning',
    ],
    process: [
      { n: '01', title: 'Wound and vein assessment', desc: 'We assess the ulcer, surrounding skin and underlying venous insufficiency with Doppler ultrasound.' },
      { n: '02', title: 'Wound care plan',           desc: 'Dressings, infection control and any in-rooms procedures required.' },
      { n: '03', title: 'Compression therapy',       desc: 'Bandaging or stockings to restore venous return and accelerate healing.' },
      { n: '04', title: 'Root-cause treatment',      desc: 'Where appropriate, we treat the underlying vein disease to prevent recurrence.' },
    ],
    faq: [
      { q: 'How long does an ulcer take to heal?',  a: 'Timelines vary, but most ulcers improve significantly within 6–12 weeks of consistent compression and care.' },
      { q: 'Do you do home visits?',                a: 'We do not currently do home visits. We do schedule longer in-rooms sessions for wound care.' },
      { q: 'Is ulcer care covered by medical aid?', a: 'Yes — venous ulcer care is a medical indication and is covered by most major South African medical aids.' },
    ],
  },

  {
    slug: 'general-surgery',
    title: 'General Surgery',
    Icon: Stethoscope,
    tagline: 'Minor procedures backed by general-surgical expertise.',
    short: 'Minor procedures and consultations from a general-surgical foundation.',
    overview:
      "Dr Sesing's general-surgical background supports a range of minor procedures and consultations beyond vein care. We provide pre- and post-operative care with the same standards as our specialist vein work.",
    treats: [
      'Minor surgical needs',
      'Pre- and post-operative consultations',
      'Skin lesions and lumps',
      'General-surgical follow-up care',
    ],
    features: [
      'Minor surgical procedures',
      'Surgical consultations',
      'Pre-operative assessments',
      'Post-operative care',
    ],
    process: [
      { n: '01', title: 'Consultation',     desc: 'A thorough history and physical exam to confirm the diagnosis and options.' },
      { n: '02', title: 'Planning',          desc: 'Where surgery is required, we plan the procedure, anaesthetic and recovery.' },
      { n: '03', title: 'Procedure',         desc: 'Minor procedures are performed in our rooms; larger procedures are referred or scheduled.' },
      { n: '04', title: 'Follow-up care',    desc: 'Wound checks, suture removal and recovery monitoring.' },
    ],
    faq: [
      { q: 'Do you handle major surgery?',   a: 'We focus on minor procedures and consultations. For major surgery, we will refer you to a trusted specialist and continue your pre/post care here.' },
      { q: 'Do I need a referral?',          a: 'No referral is needed to book a consultation. If your medical aid requires one, we can advise on the process.' },
    ],
  },

  {
    slug: 'vein-evaluations',
    title: 'Vein Evaluations',
    Icon: Award,
    tagline: 'Know your vein health with a comprehensive assessment.',
    short: 'Comprehensive assessments using advanced diagnostic techniques.',
    overview:
      'A full vein-health workup combining clinical history, physical exam and Doppler ultrasound. Use this if you have leg symptoms, a family history, or simply want a baseline before symptoms develop.',
    treats: [
      'Unexplained leg pain, heaviness or swelling',
      'Family history of vein disease',
      'Routine baseline assessment',
      'Follow-up after vein treatment',
    ],
    features: [
      'Doppler ultrasound scanning',
      'Venous insufficiency testing',
      'Treatment planning',
      'Follow-up assessments',
    ],
    process: [
      { n: '01', title: 'Clinical history',  desc: 'We discuss symptoms, lifestyle factors and family history.' },
      { n: '02', title: 'Physical exam',     desc: 'A thorough exam of the legs and venous system.' },
      { n: '03', title: 'Doppler ultrasound', desc: 'Painless, non-invasive imaging to map your veins and detect insufficiency.' },
      { n: '04', title: 'Plan & report',     desc: 'A clear report and, if needed, a treatment plan with realistic timelines.' },
    ],
    faq: [
      { q: 'How long does an evaluation take?', a: 'Plan for around 45–60 minutes for the full assessment, including ultrasound.' },
      { q: 'Is the ultrasound painful?',       a: 'No — Doppler ultrasound is completely non-invasive and painless.' },
      { q: 'Do I need this if I have no symptoms?', a: 'If you have a family history or want a baseline, a once-off evaluation is a very reasonable choice.' },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function relatedServices(slug: string, count = 2): Service[] {
  return services.filter((s) => s.slug !== slug).slice(0, count);
}
