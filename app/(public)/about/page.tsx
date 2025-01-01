'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import PageIntro from '@/components/ui/page-intro';
import { FaTwitter, FaSnapchat, FaInstagram, FaWhatsapp, FaSquareXTwitter } from 'react-icons/fa6';

const icons = [
  { icon: FaTwitter, link: 'https://twitter.com/FMATA' },
  { icon: FaSnapchat, link: 'https://www.snapchat.com/add/fmata' },
  { icon: FaInstagram, link: 'https://www.instagram.com/fmata/' },
  { icon: FaWhatsapp, link: 'https://wa.me/201010000000' },
  { icon: FaSquareXTwitter, link: 'https://twitter.com/FMATA' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary_blue/10">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <PageIntro
          title="من نحن"
          subtitle="نحن نسعى لتحقيق التميز في كل ما نقوم به"
          imageSrc="/initiatives/in1.jpg"
          icons={icons}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full rounded-xl bg-gradient-to-br from-primary_blue/10 to-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-right mb-4 text-primary_blue">رؤيتنا</h2>
                <p className="text-slate-600 text-right leading-relaxed">
                  أن نكون نموذجاً رائداً للعمل التطوعي الملهم، ونساهم في بناء مجتمعٍ متعاون ومتماسك، تتجسد فيه قيم
                  الإنسانية والتكافل.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full rounded-xl bg-gradient-to-br from-primary_blue/10 to-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-right mb-4 text-primary_blue">رسالتنا</h2>
                <p className="text-slate-600 text-right leading-relaxed">
                  نسعى لتحقيق التميز من خلال الابتكار المستمر والتطوير الدائم لخدماتنا.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Card className="h-full rounded-xl bg-gradient-to-br from-primary_blue/10 to-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-right mb-4 text-primary_blue">قيمنا</h2>
                <div className="space-y-4">
                  <div className="text-right">
                    <h3 className="font-bold text-lg mb-2 text-primary_blue">العطاء</h3>
                    <p className="text-slate-600">نؤمن أن الخير يزيد بالعطاء، ونحرص على تقديم أفضل ما لدينا.</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-lg mb-2 text-primary_blue">التعاون</h3>
                    <p className="text-slate-600">نؤمن أن التعاون يزيد بالعطاء، ونحرص على تقديم أفضل ما لدينا.</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-lg mb-2 text-primary_blue">المسؤولية</h3>
                    <p className="text-slate-600">نلتزم بالعمل الجاد والدقيق لخدمة المجتمع.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="rounded-xl bg-gradient-to-br from-primary_blue/10 to-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-right mb-4 text-primary_blue">إنجازاتنا</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-right">
                  <p className="text-slate-600">
                    تنظيم أكثر من 50 مبادرة تطوعية شملت مجالات التعليم، الصحة، والبيئة.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-600">
                    المساهمة في دعم أكثر من 200 أسرة محتاجة عبر حملاتنا الخيرية.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-600">تشجير أكثر من 1000 شجرة ضمن مبادراتنا البيئية.</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-600">
                    تعزيز الوعي المجتمعي من خلال حملات توعوية حضرها أكثر من 5000 شخص.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;