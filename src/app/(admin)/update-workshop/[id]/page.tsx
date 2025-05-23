import UpdateWorkshopForm from "@/components/admin/update-workshop/UpdateWorkshop";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

const page = async ({ params }: { params: { id: any } }) => {
  const { id } = await params;
  return (
    <div>
      <Wrapper>
        <UpdateWorkshopForm id={id} />
      </Wrapper>
    </div>
  );
};

export default page;
