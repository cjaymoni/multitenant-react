import React from "react";

function SubDomainError(props) {
  return (
    <div className="w-screen h-screen surface-200">
      <div class="flex  align-content-center justify-content-center flex-wrap card-container yellow-container">
        <div class="flex align-items-center justify-content-center w-6 h-4rem bg-yellow-500 font-bold text-gray-900 border-round m-2">
          Tenant SubDomain Error
        </div>
      </div>
      {/* <div className="align-items-center justify-content-center surface-card p-3 shadow-8 border-round w-9  bg-purple-50">
        <div> Tenant SubDomain Error</div>
      </div> */}
    </div>
  );
}

export default SubDomainError;
