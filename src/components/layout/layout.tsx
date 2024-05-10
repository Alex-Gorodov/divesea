import { FC, ReactNode } from "react"
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { BidForm } from "../bid-form/bid-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-state";
import { ConnectWallet } from "../connect-wallet/connect-wallet";

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const activeItem = useSelector((state: RootState) => state.page.bidItem)
  const isWalletFormOpened = useSelector((state: RootState) => state.page.isWalletFormOpened)
  return (
      <div className="page-container">
      <Header/>
      {children}
      {activeItem && <BidForm item={activeItem}/>}
      {isWalletFormOpened && <ConnectWallet/>}
      <Footer/>
    </div>
  )
}
