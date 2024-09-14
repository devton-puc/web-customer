const interceptorFetch = async (input, init)=>{
    showSpinner();
    return await fetch(input, init);
}