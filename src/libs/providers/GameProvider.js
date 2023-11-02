import { useActionDispatcher } from "@/hooks/useActionDispatcher";
import { createContext, useContext, useState } from "react";


export const GameContext = createContext();
export const GameProvider = ({children}) => {
    const [data1,setData1] = useState({});
    const [data2, setData2] = useState({});
    const [data3, setData3] = useState({});
    const [data4, setData4] = useState({});
    
    return (
        <GameContext.Provider value = {{data1,setData1,data2,setData2,data3,setData3,data4,setData4}}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    return useContext(GameContext);
}