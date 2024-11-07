import { useState } from "react";
import User from "./User";

const UserList = () => {
    const [users, setUsers] = useState([]);

    return (
        <div>
            {users.map((user) => (
                <User key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UserList;