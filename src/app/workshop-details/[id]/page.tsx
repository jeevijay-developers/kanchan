import WorkshopDetails from "@/components/inner-pages/workshops/workshop-details";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

const page = async ({ params }: { params: { id: any } }) => {
  const { id } = await params;
  return (
    <Wrapper>
      <WorkshopDetails id={id} />
    </Wrapper>
  );
};

export default page;
