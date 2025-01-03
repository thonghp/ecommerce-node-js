/**
 * As a wrapper function, it wraps routers or middleware when using async await to help limit the use
 * of try catch and pass errors to the error handling middleware.
 * @param {*} fn async function
 * @returns an asynchronous function, it will catch the error and move to the next middleware
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

module.exports = asyncHandler
