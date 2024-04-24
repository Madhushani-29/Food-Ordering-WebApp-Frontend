import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// TypeScript type definition for the props object expected by the layout component
type Props = {
    //component expects a children prop of type React.ReactNode
    //children:prop passed to the layout component. It represents the content that will be rendered within the layout component
    //TypeScript type that represents the type of children that a React component can accept
    children: React.ReactNode;
    showHero?: boolean;
}

const Layout = ({ children, showHero = false }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {showHero && <Hero />}
            <div className="container mx-auto flex-1 py-10">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout; 