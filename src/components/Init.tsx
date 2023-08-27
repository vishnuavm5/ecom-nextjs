import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/store/atom/userAtom";
import axios from "axios";

const InitUser = () => {
  const setUser = useSetRecoilState(userAtom);

  const init = async () => {
    try {
      const response = await axios.get("/api/users/me");
      // console.log(response.data._doc);
      if (response.data._doc._id) {
        setUser({
          fullName: response.data._doc.fullName,
          email: response.data._doc.email,
          isSeller: response.data._doc.isSeller,
          id: response.data._doc._id,
        });
      } else {
        setUser({
          fullName: null,
          email: null,
          isSeller: false,
          id: null,
        });
      }
    } catch (error: any) {
      console.log(error);
      setUser({
        fullName: null,
        email: null,
        isSeller: false,
        id: null,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
};

export default InitUser;
