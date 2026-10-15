const hindu = 'src/assets/news/hindu.png';
const ndtv = 'src/assets/news/ndtv.jpeg';

const RSS_FEEDS = {
  hindu: "https://www.thehindu.com/sci-tech/science/?service=rss",
  toi: "https://timesofindia.indiatimes.com/rssfeeds/-2128672765.cms",
  ndtv: "https://news.google.com/rss/search?q=site:ndtv.com+science&hl=en-IN&gl=IN&ceid=IN:en"
};

const getRSSJson = (rssUrl) => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

const TrendingNews = () => {
  const [newsItems, setNewsItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        const [hinduResponse, toiResponse, ndtvResponse] = await Promise.all([
          fetch(getRSSJson(RSS_FEEDS.hindu)),
          fetch(getRSSJson(RSS_FEEDS.toi)),
          fetch(getRSSJson(RSS_FEEDS.ndtv))
        ]);

        const [hinduData, toiData, ndtvData] = await Promise.all([
          hinduResponse.ok ? hinduResponse.json() : { items: [] },
          toiResponse.ok ? toiResponse.json() : { items: [] },
          ndtvResponse.ok ? ndtvResponse.json() : { items: [] }
        ]);

        const extractImage = (item) => {
          if (item.enclosure?.url) return item.enclosure.url;
          if (item.enclosure?.link) return item.enclosure.link;
          if (item.media?.content?.url) return item.media.content.url;
          if (item.media?.thumbnail?.url) return item.media.thumbnail.url;
          const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) return imgMatch[1];
          return null;
        };

        const filterScience = (item) => {
          const keywords = ['science', 'space', 'tech', 'research', 'discovery'];
          const content = (item.title + (item.description || '')).toLowerCase();
          return keywords.some(kw => content.includes(kw));
        };

        const hinduItems = (hinduData.items || []).filter(filterScience).slice(0, 1).map((item) => ({
          title: item.title,
          excerpt: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          link: item.link,
          source: "The Hindu",
          logo: hindu,
          image: extractImage(item),
          pubDate: item.pubDate
        }));

        const toiItems = (toiData.items || []).filter(filterScience).slice(0, 1).map((item) => ({
          title: item.title,
          excerpt: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          link: item.link,
          source: "Times of India",
          logo: "https://timesofindia.indiatimes.com/photo/507610.cms",
          image: extractImage(item),
          pubDate: item.pubDate
        }));

        const ndtvItems = (ndtvData.items || []).slice(0, 1).map((item) => ({
          title: item.title,
          excerpt: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          link: item.link,
          source: "NDTV",
          logo: ndtv,
          image: extractImage(item),
          pubDate: item.pubDate
        }));

        const allItems = [...hinduItems, ...toiItems, ...ndtvItems].sort((a, b) =>
          new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime()
        ).slice(0, 6);

        setNewsItems(allItems);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsItems([
          {
            title: "India's Aditya-L1 solar mission completes one year in space",
            excerpt: "ISRO's first solar observatory has successfully completed one year in orbit, providing valuable data about the Sun's corona and solar winds.",
            link: "https://www.thehindu.com/sci-tech/science/",
            source: "The Hindu",
            logo: hindu,
            image: null,
          },
          {
            title: "NASA's Artemis II crew announced for Moon mission",
            excerpt: "NASA reveals the four astronauts who will fly around the Moon in 2025, including the first woman and next man to orbit Earth's natural satellite.",
            link: "https://www.ndtv.com/science",
            source: "NDTV",
            logo: ndtv,
            image: null,
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-card text-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-4 text-foreground" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>Trending News</h2>
          <div className="mt-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-card text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-4 text-foreground" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>Trending News</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto text-justify">
          Stay updated with the latest breakthroughs, discoveries, and innovations—curated from trusted sources.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div key={index} className="flex flex-col align-center bg-background rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-border">
              {item.image && (
                <div className="mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="flex items-center mb-4">
                <img src={item.logo} alt={item.source} className="w-8 h-8 mr-3 rounded" />
                <span className="text-sm text-muted-foreground"> Credits: {item.source}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground mb-4 text-justify">{item.excerpt}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                Read more
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.TrendingNews = TrendingNews;
