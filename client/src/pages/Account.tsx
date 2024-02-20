import React, { useState } from 'react'

export default function Account() {
  const isAuthenticated = useState(false);
  
  return isAuthenticated ? <div>You need to Login </div>: <div>Account</div>;
}
