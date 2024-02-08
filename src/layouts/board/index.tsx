import { UserServiceResponseDto } from "@/lib/services/auth/schema";
import { me } from "@/lib/services/users";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface BoardLayoutProps {
  sideMenu: any;
  dashboardHeader: any;
  children: ReactNode;
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

function BoardLayout({ sideMenu, dashboardHeader, children }: BoardLayoutProps) {
  const [myData, setMyData] = useState<UserServiceResponseDto>({} as UserServiceResponseDto);

  useEffect(() => {
    const fetchMyData = async () => {
      const response = await me("get");
      setMyData(response.data as UserServiceResponseDto);
    };

    fetchMyData();
  }, []);

  return (
    <MyDataContext.Provider value={{ myData, setMyData }}>
      <div className="grid grid-rows-[60px_1fr] tablet:grid-rows-[70px_1fr] grid-cols-[67px_minmax(auto,_1fr)] tablet:grid-cols-[160px_minmax(auto,_1fr)] pc:grid-cols-[300px_minmax(auto,_1fr)] min-h-screen bg-gray-FAFA">
        <div className="row-span-2">{sideMenu}</div>
        <div className="col-span-1">{dashboardHeader}</div>
        <div className="col-span-1 overflow-auto h-[calc(100vh-7rem)]">{children}</div>
      </div>
    </MyDataContext.Provider>
  );
}

export default BoardLayout;
