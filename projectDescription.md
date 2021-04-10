PROJECT DESCRIPTION

1. Public/Private part: HOME, ABOUT & TERMS pages as public part, all else private.
2. General requirements:
   - dynamic header, dynamic HOME page for logged in users, with posts of clients you follow
   - dynamic profile page and edit post page for creating and editing content
   - use of react.js for client side: tons of components, hooks and routing
   - use of socket.io-client for a two-way chat communication between clients
   - authentication via mongo and nodeJS backend
   - client-side routing with react-router-dom browser router and dynamic links
   - React cocepts: - most components are stateful, some like TERMS are stateless; - use of hooks: useEffect, useState, useContext, useRef - bound forms: registration form with values & onClick handlers - coponents used for styling: PAGE has CONTAINER drilling down css in props - components used for authentication: isAUTH with single components input and 2 outputs - use of GitHub for the project - description of architecture below in this file
3. Other requirements:

   - error handling everywhere /try|catch/, flashMessage notifications, cleanup functions
   - desktop version with straightforward UI and smooth UX /loading icons, intuitive design/

4. Bonuses:
   - immer solving the immutable state management react standard
   - GoogleMaps UNDER CONSTRUCTION

N. Architecture:
