import { FC, ReactNode } from "react"
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { BidForm } from "../bid-form/bid-form";

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  children,
}) => (
  <div className="page-container">
    <Header/>
    {children}
    <BidForm/>
    <Footer/>
  </div>
)
