import Skeleton from "@mui/material/Skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="container products_container">
      <div className="row mt-3 detail_product_container">
        <div className="col-lg-6 col-md-12 col-12">
          <Skeleton variant="rectangular" width="100%" height={400} />
        </div>
        <div className="col-lg-6 col-md-12 col-12">
          <Skeleton
            variant="rectangular"
            width="50%"
            height={30}
            className="mb-1"
          />
          <Skeleton variant="text" width="90%" height="200px" />
          <Skeleton variant="text" width="60%" className="mb-4" />
          <Skeleton variant="text" width="60%" className="mb-4" />
          <Skeleton variant="text" width="60%" className="mb-4" />
          <Skeleton variant="text" width="60%" className="mb-4" />
          <Skeleton variant="text" width="40%" height="50px" className="mb-2" />
          <Skeleton variant="text" width="40%" height="50px" className="mb-2" />
          <Skeleton variant="text" width="40%" height="50px" className="mb-2" />
          <Skeleton
            variant="text"
            width="100%"
            height="50px"
            className="mb-2"
          />
          {/* ... other Skeletons for price, description, etc. */}

          {/* ... Skeletons for buttons and other elements */}
        </div>
      </div>
    </div>
  );
}

export const ProductListItemSkeleton = ({
  alignment,
}: {
  alignment: string;
}) => {
  return alignment === "list" ? (
    <div className="col-12 border rounded p-2 m-2">
      <div className="row mt-2 mb-2">
        <div className="col-6">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={230}
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="col-6 p-0 pr-3">
          <Skeleton variant="text" width="30%" className="mb-2" />
          <Skeleton variant="text" width="15%" className="mb-2" />
          <Skeleton variant="text" width="20%" className="mb-2" />
          <Skeleton variant="text" width="20%" />

          <Skeleton variant="text" width="90%" height="115px" />
        </div>
      </div>
    </div>
  ) : (
    <div className="col-lg-4 col-sm-6 col-xs-12 rounded p-2">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={150}
        className="mb-2"
      />
      <div className="d-flex align-items-center justify-content-between">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="20%" />
      </div>
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" width="45%" />
    </div>
  );
};
