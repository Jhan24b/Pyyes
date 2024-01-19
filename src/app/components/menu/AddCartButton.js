export default function AddCartButton({hasSizeorExtras, onClick, basePrice}){
    return(
        <><button
        type="button"
        onClick={() => {
            onClick();
        }}
        className="bg-primary text-white rounded-full px-8 py-2 mt-4"
      >
        {hasSizeorExtras ? (
          <span>
            Add to cart (from <b>S/. {basePrice}</b>)
          </span>
        ) : (
          <span>
            {" "}
            Add to cart <b>S/. {basePrice}</b>
          </span>
        )}
      </button>
        </>
    )
}