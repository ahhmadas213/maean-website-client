import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { title: 'روابط سريعة', links: [
    { name: 'الرئيسية', href: '/' },
    { name: 'عن المنظمة', href: '/about' },
    { name: 'فرص التطوع', href: '/opportunities' },
    { name: 'الأخبار', href: '/news' },
  ]},
  { title: 'تواصل معنا', links: [
    { name: 'اتصل بنا', href: '/contact' },
    { name: 'الأسئلة الشائعة', href: '/faq' },
    { name: 'الدعم', href: '/support' },
  ]},
  { title: 'قانوني', links: [
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'شروط الاستخدام', href: '/terms' },
  ]},
]

const socialLinks = [
  { name: 'فيسبوك', href: '#', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
  { name: 'تويتر', href: '#', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
  { name: 'انستغرام', href: '#', icon: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm4-11a1 1 0 100-2 1 1 0 000 2zm-7.5 4a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zm1 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-200  text-white ">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
          <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 flex gap-2 items-center justify-center text-primary_gray  p-1.5">
            <Image className="h-12 w-auto"
            src="/logo.png" alt="فريق معاً التطوعي" width={150} height={50} />
            <span className=" text-xl font-bold">فريق معاً التطوعي</span>
          </Link>
        </div>

            <p className="text-black text-base">
              معاً نصنع الفرق في مجتمعنا من خلال العمل التطوعي والمبادرات الإيجابية.
            </p>
            <div className="flex space-x-6 space-x-reverse">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                  <span className="sr-only">{item.name}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={item.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerLinks.slice(0, 2).map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-black tracking-wider uppercase">
                    {column.title}
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {column.links.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-base text-gray-500 hover:text-primary_blue">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerLinks.slice(2).map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    {column.title}
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {column.links.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-base text-gray-500 hover:text-primary_blue">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 ">
            &copy; {new Date().getFullYear()}  جميع الحقوق محفوظة فريق معاً التطوعي
          </p>
        </div>
      </div>
    </footer>   
  )
}

