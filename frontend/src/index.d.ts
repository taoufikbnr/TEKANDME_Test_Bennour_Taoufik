declare type userInfo = {
    id:string;
    username:string;
    email:string;
}
declare type task ={
    id?: number;
    userId:number;
    documentId:number
    title?: string;
    description: string;
    startDate: string;
    endDate: string;
    completed?: boolean | undefined
    createdAt:string
    setSelectedTask:SetStateAction<null>
  }
 
  declare type UserContextType = {
    token: string | null;
    userInfo: { username: string; email: string; id: string } | null;
    setToken: (token: string) => void;
    setUserInfo: (userInfo: { username: string; email: string; id: string }) => void;
    loading:boolean;
    tasks:task[];
    setTasks: React.Dispatch<React.SetStateAction<task[]>>;
    setLoading: Dispatch<React.SetStateAction<boolean>>;
  }