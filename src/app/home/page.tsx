import HeroSection from "@/components/HeroSection";
import TrendingMovies from "@/components/TrendingMovies";
import TrendingSeries from "@/components/TrendingSeries";
import Header from "@/components/Header";
export default function Home() {
    return (
        <div >
            <Header />
            <HeroSection />
            <TrendingMovies />
            <TrendingSeries />
        </div>
    );
}