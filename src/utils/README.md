# Server-Side Auth Utility

## getUserFromRequest(req)

Use during SSR when `window`/`document`/`localStorage` are undefined.

```js
import { getUserFromRequest } from '../utils/auth.js';

// In your SSR handler (e.g. Express, Next.js getServerSideProps context)
const user = await getUserFromRequest(req);
if (!user) {
  // Unauthenticated
}
// user: { userId, email, role }
```
