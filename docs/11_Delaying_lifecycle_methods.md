### Delaying any other lifecycle method *(advanced)*
Magna is a tree held together by **Promises**, using this you can use you own promises to delay the execution of 
children, at a low level Magna will run through the decision tree and fire every Promise at the same time waiting 
for parents to fulfill their promises before fulfilling their promise (top down), and the reverse when destroying, it 
will run (bottom up).

You can replace the default `initPromise`, `destroyPromise` & `popstatePromise` methods with whatever will make your 
application work, however, this should only be for advanced users. Whenever you run the respective `init`, `destroy` 
or `popstate` methods you can consume the responses using `initResponse`, `destroyResponse` & `popstateResponse`.
