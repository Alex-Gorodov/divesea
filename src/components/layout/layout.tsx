import { FC, ReactNode } from "react"
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { BidForm } from "../bid-form/bid-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-state";

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const activeItem = useSelector((state: RootState) => state.page.bidItem)
  return (
      <div className="page-container">
      <Header/>
      {children}
      {activeItem && <BidForm item={activeItem}/>} {/* Проверяем, что есть активный элемент перед отображением формы */}
      <Footer/>
    </div>
  )
}
