import React from "react";
import { User } from "@/utils/types/User";
import { LuPenLine } from "react-icons/lu";

type ProfileInfoProps = Partial<User>;

const ProfileInfo: React.FC<ProfileInfoProps> = ({ cellphone, email, name, role }) => {
  return (
    <article className="rounded-lg shadow-md border p-2">
      <div className="flex justify-between items-center mb-8">
        <h3>Profile information {role}</h3>
        <LuPenLine color="#000" />
      </div>
      <div className="text-left">
        <p className="flex items-center gap-4 text-gray-600 text-sm">
          <span className="font-semibold"> Full Name: </span>
          {name}
        </p>
      </div>
      <div className="text-left">
        <p className="flex items-center gap-4 text-gray-600 text-sm">
          <span className="font-semibold"> Cellphone: </span>
          {cellphone}
        </p>
      </div>

      <div className="text-left">
        <p className="flex items-center gap-4 text-gray-600 text-sm3">
          <span className="font-semibold"> Email: </span>
          {email}
        </p>
      </div>
    </article>
  );
};

export default ProfileInfo;
