import Header from "@/components/Header";

// TypeScript type definition for the props object expected by the layout component
type Props = {
    //component expects a children prop of type React.ReactNode
    //children:prop passed to the layout component. It represents the content that will be rendered within the layout component
    //TypeScript type that represents the type of children that a React component can accept
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="container mx-auto flex-1 py-10">{children}</div>
        </div>
    )
}

export default Layout; 