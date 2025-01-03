'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import PageIntro from '@/components/ui/page-intro';
import { FaTwitter, FaSnapchat, FaInstagram, FaWhatsapp, FaSquareXTwitter } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const icons = [
  { icon: FaTwitter, link: 'https://twitter.com/FMATA' },
  { icon: FaSnapchat, link: 'https://www.snapchat.com/add/fmata' },
  { icon: FaInstagram, link: 'https://www.instagram.com/fmata/' },
  { icon: FaWhatsapp, link: 'https://wa.me/201010000000' },
  { icon: FaSquareXTwitter, link: 'https://twitter.com/FMATA' },
];

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary_blue/10">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <PageIntro
          title="تواصل معنا"
          subtitle="نحن هنا للإجابة على استفساراتك ومساعدتك في أي شيء تحتاجه"
          imageSrc="/contact.jpg"
          icons={icons}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="rounded-xl h-full bg-gradient-to-br from-primary_blue/10 to-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-right mb-4 text-primary_blue">معلومات التواصل</h2>
                <div className="space-y-4 text-right">
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary_blue">العنوان</h3>
                    <p className="text-slate-600">شارع التطوع، الرياض، المملكة العربية السعودية</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary_blue">البريد الإلكتروني</h3>
                    <p className="text-slate-600">info@fmata.org</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary_blue">الهاتف</h3>
                    <p className="text-slate-600">+966 12 345 6789</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="rounded-xl bg-gradient-to-br from-primary_blue/10 to-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-right mb-4 text-primary_blue">أرسل لنا رسالة</h2>
                <form className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="الاسم الكامل"
                      className="w-full text-right rounded-lg bg-white/50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      className="w-full text-right rounded-lg bg-white/50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="رسالتك"
                      className="w-full text-right rounded-lg bg-white/50 focus:bg-white"
                      rows={5}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-primary_blue text-white hover:bg-primary_blue/90 transition-colors"
                    >
                      إرسال الرسالة
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="rounded-xl bg-gradient-to-br from-primary_blue/10 to-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-right mb-4 text-primary_blue">موقعنا على الخريطة</h2>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.041714516832!2d46.67227631500271!3d24.87356298404843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee3b9b8b8b8b9%3A0x3e2ee3b9b8b8b8b9!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1623680000000!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;