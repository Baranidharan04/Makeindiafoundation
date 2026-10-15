const youtubeChannels = [
  {
    name: "Chitti Tamil",
    description: "Explore fascinating science concepts explained in Tamil through engaging videos and entertaining content.",
    channelUrl: "https://youtube.com/@chitti_tamil",
    subscribers: "1.2M+",
    category: "Science & Entertainment",
    logo: "https://yt3.googleusercontent.com/n5buBylgRIT5zu_Eik8UsCqmV3uCcQlIu0HnW2JPxQxjDt8XTbkzi4bUW64E-JFvtpgyrcXP-g=s160-c-k-c0x00ffffff-no-rj",
    icon: "🎬"
  },
  // {
  //   name: "Dr Binocs Tamil",
  //   description: "Educational science content in Tamil featuring Dr. Binocs explaining complex scientific phenomena in simple terms.",
  //   channelUrl: "https://youtube.com/@drbinocsthamil",
  //   subscribers: "2.5M+",
  //   category: "Educational Science",
  //   logo: "https://yt3.googleusercontent.com/muw3_iyfre4S5GqyjUdiviFHRjEsQNL6bUO0i6gI4-2Vfwpj2tgsQrsRMTsBL2E4LdT3rRqKFQ=s160-c-k-c0x00ffffff-no-rj",
  //   icon: "🧪"
  // },
  {
    name: "Science Channel",
    description: "Comprehensive science and education content covering physics, chemistry, biology, and technology topics.",
    channelUrl: "https://www.youtube.com/channel/UCNwcxhfBVDgwx9Lv3CBpu6A",
    subscribers: "800K+",
    category: "STEM Education",
    logo: "https://yt3.googleusercontent.com/ytc/AIdro_mgv10rzOO0ewY6gvNeUwviD1pQdir_kGEmXss_aauInP4=s160-c-k-c0x00ffffff-no-rj",
    icon: "🔬"
  },
  {
    name: "Khan Academy",
    description: "Free online education platform offering courses in science, math, and other subjects.",
    channelUrl: "https://www.youtube.com/c/khanacademy",
    subscribers: "10M+",
    category: "Educational",
    logo: "https://yt3.googleusercontent.com/ytc/AIdro_l3GggKOWViCBpDs9APIsK6MHB2Mu-ECo5dUEU-Vay2gg=s160-c-k-c0x00ffffff-no-rj",
    icon: "🎓"
  }
];

const ScienceSimplified = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-background py-20 px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 text-foreground" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>Science Simplified</h1>
        <p className="text-lg text-muted-foreground max-w-3xl text-center">
          Dive into the world of science with these simplified explanations, engaging visuals, and real-world applications. Whether you're a student, educator, or just curious about how things work, Science Simplified makes complex scientific concepts easy to understand and fun to explore.
        </p>
      </div>

      <div className="pb-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 pointer-events-none" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youtubeChannels.map((channel, index) => (
              <a
                key={index}
                href={channel.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/50 hover:scale-105"
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      className="w-24 h-24 rounded-full border-4 border-primary/30 group-hover:border-primary/80 transition-all duration-300 object-cover group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="text-6xl">${channel.icon}</div>`;
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center mb-4">
                  <span className="text-sm font-semibold text-muted-foreground">{channel.subscribers} Subscribers</span>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {channel.name}
                </h3>

                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {channel.category}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed text-justify">
                  {channel.description}
                </p>

                <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
                  <span>Visit Channel</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/10 rounded-2xl p-5 text-center max-w-3xl flex items-start sm:items-center gap-4 text-left">
              <Info className="w-6 h-6 text-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Credits & Disclaimer:</strong> All content, videos, and logos featured above belong to their respective YouTube creators. Make India Foundation curates these channels purely for educational purposes to inspire learning. We do not own or claim copyrights to these materials.
              </p>
            </div>
          </div>

          {/* Sponsors Section */}
          <div className="mt-20 overflow-hidden relative">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">Our Sponsors</h2>
              <p className="text-muted-foreground mt-2">Proudly supported by our amazing partners</p>
            </div>
            
            <div className="flex justify-center gap-12 flex-wrap items-center">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-white p-2 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img src="src/assets/AIC.jpeg" alt="AIC" className="w-full h-full object-contain rounded-full" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-white p-2 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img src="src/assets/bytes.jpeg" alt="Bytes & Bots" className="w-full h-full object-contain rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5d3b2d] via-[#8a5a43] to-[#a47b4a]"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#d99a1e]/20 via-[#f5b942]/20 to-[#7d9a57]/20 animate-pulse"></div>

              <div className="relative p-12 text-center">
                <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of young innovators who have turned their ideas into reality through MIF's STEM competitions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/competitions/categories"
                    className="group relative bg-[#f8f1e8] text-[#5d3b2d] px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white hover:text-primary"
                  >
                    Register Now
                    <ArrowRight className="inline-block w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/about"
                    className="group relative bg-transparent border-2 border-white/80 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-2xl hover:-translate-y-1"
                  >
                    About Make India Foundation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ScienceSimplified = ScienceSimplified;
