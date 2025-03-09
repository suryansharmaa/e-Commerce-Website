import ProductFilter from "@/components/shopping-view/Filter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { filterOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import React, { Fragment, useEffect } from "react";
import { sortOptions } from "@/config";
import { useDispatch } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping-view/Product-Tile";

export default function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  useEffect(() => {
    dispatch(fetchAllFilteredProducts);
  }, [dispatch]);

  console.log(productList);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground"> 10 Products</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem key={sortItem.id}>
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 p-4">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile product={productItem} />
                ))
              : null}
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex items-center gap-2 font-medium">
                    <Checkbox />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </>
  );
}
