import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useWindowSize } from "usehooks-ts";
import { DashboardContext } from "@/pages/dashboard/[id]";
import { UserServiceResponseDto } from "@/lib/services/auth/schema";
import { DashboardApplicationServiceResponseDto } from "@/lib/services/comments/schema";
import { me } from "@/lib/services/users";
import SideMenu from "@/components/common/SideMenu";

interface BoardLayoutProps {
  dashboardList: DashboardApplicationServiceResponseDto[];
  dashboardHeader: React.ReactElement;
  children: ReactNode;
  scrollBtn?: boolean;
}

interface MyDataContextType {
  myData: UserServiceResponseDto;
  setMyData: Dispatch<SetStateAction<UserServiceResponseDto>>;
}

const COLUMN_WIDTH = 354;
const SIDEBAR_WIDTH = 300;
const MOVEMENT = COLUMN_WIDTH * 6;

export const MyDataContext = createContext<MyDataContextType | undefined>(undefined);

export const useMyData = () => {
  const context = useContext(MyDataContext);
  if (context === undefined) {
    throw new Error("반드시 MyDataProvider 안에서 사용해야 합니다.");
  }
  return context;
};

function BoardLayout({ dashboardList, dashboardHeader, children, scrollBtn }: BoardLayoutProps) {
  const [myData, setMyData] = useState<UserServiceResponseDto>({} as UserServiceResponseDto);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const { columnsData } = useContext(DashboardContext);
  const columnsCount = columnsData.length;
  const columnsWidth = columnsCount * COLUMN_WIDTH;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { width: windowWidth } = useWindowSize();
  const containerWidth = windowWidth - SIDEBAR_WIDTH;

  const handleScroll = (scrollAmount: number) => {
    if (containerRef.current) {
      const newScrollPosition = scrollPosition + scrollAmount;
      setScrollPosition(newScrollPosition);
      containerRef.current.scrollLeft = newScrollPosition;
    }
  };

  const scrollLimit = windowWidth - 354;

  useEffect(() => {
    const fetchMyData = async () => {
      const response = await me("get");
      setMyData(response.data as UserServiceResponseDto);
    };

    const handleScrollReset = () => {
      if (columnsCount < 6) return;
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0;
        setScrollPosition(0);
        return;
      }
    };

    handleScrollReset();
    fetchMyData();
  }, [columnsCount]);

  return (
    <MyDataContext.Provider value={{ myData, setMyData }}>
      <div className="grid grid-rows-[60px_1fr] tablet:grid-rows-[70px_1fr] grid-cols-[67px_minmax(auto,_1fr)] tablet:grid-cols-[160px_minmax(auto,_1fr)] pc:grid-cols-[300px_minmax(auto,_1fr)] min-h-screen bg-gray-FAFA">
        <div className="row-span-2">
          <SideMenu dashboardList={dashboardList} />
        </div>
        <div className="col-span-1">{dashboardHeader}</div>
        <div ref={containerRef} className="col-span-1 overflow-auto h-[calc(100vh-7rem)] scroll-smooth">
          {children}
        </div>
      </div>
      {scrollBtn && columnsWidth > containerWidth && (
        <div className="hidden pc:block">
          {scrollPosition !== 0 && (
            <button
              className="pc:fixed  pc:top-500 pc:left-330"
              onClick={() => {
                handleScroll(-MOVEMENT);
              }}>
              <Image src="/images/arrow_left.png" alt="arrow left" width={16} height={16} />
            </button>
          )}
          {scrollPosition < scrollLimit && (
            <button
              className="pc:fixed  pc:top-500 pc:right-40"
              onClick={() => {
                handleScroll(MOVEMENT);
              }}>
              <Image src="/images/arrow_right.png" alt="arrow right" width={16} height={16} />
            </button>
          )}
        </div>
      )}
    </MyDataContext.Provider>
  );
}

export default BoardLayout;
