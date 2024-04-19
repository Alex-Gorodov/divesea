import { FC, ReactNode } from "react"
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  children,
}) => (
  <div className="page-container">
    <Header/>
    {children}
    <Footer/>
  </div>
)
