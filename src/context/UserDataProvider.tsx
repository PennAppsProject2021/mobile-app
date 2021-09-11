import React, { useState, ReactNode } from 'react';

type UD = Record<string, unknown>

const UserDataContext = React.createContext<{userData: UD, setUserData: (data: UD) => void}>({
    userData: {
        name: "Ryan Ziegler"
    },
    setUserData: () => null,
});

type Props = {
    children: ReactNode
}
function UserDataProvider({children}: Props) {
    const [userData, setUserData] = useState<UD>({name: "Ryan Ziegler"});

    return (
        <UserDataContext.Provider value={{userData, setUserData}}>
            {children}
        </UserDataContext.Provider>
    )
}

function useUserData() {
    return React.useContext(UserDataContext);
}

export {UserDataProvider, useUserData};