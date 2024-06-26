import { ConnectWallet } from "../connect-wallet/connect-wallet";
import { RootState } from "../../store/root-state";
import { BidForm } from "../bid-form/bid-form";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { useSelector } from "react-redux";
import { FC, ReactNode } from "react"

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const activeItem = useSelector((state: RootState) => state.page.bidItem)
  return (
      <div className="page-container">
      <Header/>
      {children}
      {activeItem && <BidForm item={activeItem}/>}
      <ConnectWallet/>
      <Footer/>
    </div>
  )
}
