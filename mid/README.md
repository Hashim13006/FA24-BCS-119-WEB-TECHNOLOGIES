# Midterm - Web Technologies Fundamentals (Etsy clone)

| Field | Value |
|---|---|
| Name | M.Hashim |
| Roll number | FA24-BCS-119 |
| N | 119 |
| BP | 991 px (breakpoint used in `style.css`, `@media (max-width: 991px)`) |
| H | 300 px (desktop product image height in `style.css`) |
| K | 5 (maximum copies of one product in the cart, `(N mod 4) + 2 = (119 mod 4) + 2 = 5`) |

PDF: `FA24-BCS-119-midterm.pdf`

## Files changed

`index.html`, `script.js`, `style.css`, `checkout.html`, `checkout.css` (new), `checkout.js` (new)

### Task 1 - Shop by Category menu
- **`style.css`**: below 992 px the mobile accordion was always visible inside the header and pushed the search box, heart and cart icons out of view. It is now hidden and opens as a dropdown under the category button on hover/focus.
- This keeps the header usable at 375 px and BP px, while the full-width mega menu stays unchanged at 1280 px.

### Task 2 - Checkout form validation
- **`checkout.js` (new)**: validates every field with the browser rules already in the HTML (required, email type, phone pattern `03XX-XXXXXXX`, city selected, delivery date between today and today + 7 days). Invalid fields get the `is-invalid` class and show their error message. A valid form shows a success message.
- **`checkout.css` (new)**: `checkout.html` linked this file but it did not exist. It lays out the label/input rows and hides error messages until a field is invalid.
- **`checkout.html`**: added the success message box and the `checkout.js` script tag.

### Task 3 - Shopping cart
- **`index.html`**: added `<script src="script.js">`. It was never loaded, so no cart buttons, badge or mini-cart appeared.
- **`script.js`**: `MAX_LIMIT` changed from 3 to 5, because (119 mod 4) + 2 = 5. Added `e.preventDefault()` to the Add to Cart click so the button inside the product link does not navigate away.
- **`style.css`**: added the missing styles for the mini-cart panel and cart badge, and made the search bar wrap to its own row below 576 px so the cart icon no longer overflows at 375 px.

## AI tools used
- Claude (Anthropic): used to fix the files above, run the pages in a headless browser to take the screenshots, and generate the PDF and this README.
