'use client'
import MediaItem from "./ui/media-item";
import SectionTitle from "./ui/section-title";

const mediaItems = [
  {
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    type: "image" as const,
    title: "متطوعون في العمل",
    description: "مجموعة من المتطوعين يعملون معًا لإحداث تغيير إيجابي"
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    type: "image" as const,
    title: "التطوع الرقمي",
    description: "استخدام التكنولوجيا للمساعدة في العمل التطوعي"
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    type: "image" as const,
    title: "العمل الجماعي",
    description: "نعمل معًا من أجل مستقبل أفضل"
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    type: "image" as const,
    title: "مشاريع تطوعية",
    description: "مبادرات تطوعية تساهم في تنمية المجتمع"
  }
];
const MediaSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-primary_blue/10">
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle title="معرض الوسائط" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mediaItems.map((item, index) => (
            <MediaItem
              key={index}
              src={item.src}
              type={item.type}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default MediaSection;