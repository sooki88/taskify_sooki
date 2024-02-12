import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { DashboardContext } from "@/pages/dashboard/[id]";
import { useWindowSize } from "usehooks-ts";
import { LeftScrollButton, RightScrollButton } from "@/components/dashboard/ScrollButton";
import { useEventListener } from "usehooks-ts";
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

export const MyDataContext = createContext<MyDataContextType | undefined>(undefined);

export const useMyData = () => {
  const context = useContext(MyDataContext);
  if (context === undefined) {
    throw new Error("반드시 MyDataProvider 안에서 사용해야 합니다.");
  }
  return context;
};

const COLUMN_WIDTH = 354;
const SIDEBAR_WIDTH = 300;
const MOVEMENT = COLUMN_WIDTH * 3 - 50;

function BoardLayout({ dashboardList, dashboardHeader, children, scrollBtn }: BoardLayoutProps) {
  const [myData, setMyData] = useState<UserServiceResponseDto>({} as UserServiceResponseDto);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [rightButtonToggle, setRightButtonToggle] = useState(true);

  const { columnsData } = useContext(DashboardContext);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { width: windowWidth } = useWindowSize();
  const columnsCount = columnsData.length;
  const columnsWidth = columnsCount * COLUMN_WIDTH;
  const containerWidth = windowWidth - SIDEBAR_WIDTH;

  const handleButtonScroll = (scrollAmount: number) => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("scroll-behavior", "smooth");
      const newScrollPosition = scrollPosition + scrollAmount;
      setScrollPosition(newScrollPosition);
      containerRef.current.scrollLeft = newScrollPosition;
    }
  };

  const onScroll = () => {
    if (containerRef.current) {
      const changedScrollPosition = containerRef.current.scrollLeft;
      const scrollbarWidth = containerRef.current.clientWidth;
      const scrollWidth = containerRef.current.scrollWidth;
      setScrollPosition(changedScrollPosition);

      const isAtRightEnd = changedScrollPosition + scrollbarWidth >= scrollWidth;
      setRightButtonToggle(!isAtRightEnd);
    }
  };

  useEventListener("scroll", onScroll, containerRef);

  useLayoutEffect(() => {
    const fetchMyData = async () => {
      const response = await me("get");
      setMyData(response.data as UserServiceResponseDto);
    };

    const handleScrollReset = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("scroll-behavior", "auto");
        containerRef.current.scrollTo(0, 0);
        setScrollPosition(0);
        setRightButtonToggle(true);
        return;
      }
    };

    handleScrollReset();
    fetchMyData();
  }, [columnsData]);

  return (
    <MyDataContext.Provider value={{ myData, setMyData }}>
      <div className="grid grid-rows-[60px_1fr] tablet:grid-rows-[70px_1fr] grid-cols-[67px_minmax(auto,_1fr)] tablet:grid-cols-[160px_minmax(auto,_1fr)] pc:grid-cols-[300px_minmax(auto,_1fr)] min-h-screen bg-gray-FAFA">
        <div className="row-span-2">
          <SideMenu dashboardList={dashboardList} />
        </div>
        <div className="col-span-1">{dashboardHeader}</div>
        <div ref={containerRef} className="col-span-1 overflow-auto h-[calc(100vh-7rem)] ">
          {children}
        </div>
      </div>
      {scrollBtn && columnsWidth > containerWidth && (
        <div className="hidden pc:block ">
          {scrollPosition !== 0 && (
            <LeftScrollButton
              onClick={() => {
                handleButtonScroll(-MOVEMENT);
              }}
            />
          )}
          {rightButtonToggle && (
            <RightScrollButton
              onClick={() => {
                handleButtonScroll(MOVEMENT);
              }}
            />
          )}
        </div>
      )}
    </MyDataContext.Provider>
  );
}

export default BoardLayout;
