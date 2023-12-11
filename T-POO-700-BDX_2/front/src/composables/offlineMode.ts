type StoredRequest = {
  url: string
  options?: RequestInit
}

const useOfflineMode = () => {
  function registerRequest(url: string, options?: RequestInit) {
    const newStoredRequest: StoredRequest = {
      url,
      options
    }

    let storedRequests: StoredRequest[] = []
    const storedRequestsStr = localStorage.getItem('requests')
    if (storedRequestsStr) storedRequests = JSON.parse(storedRequestsStr) as StoredRequest[]
    storedRequests.push(newStoredRequest)

    localStorage.setItem('requests', JSON.stringify(storedRequests))
  }

  async function sendStoredRequests(): Promise<boolean> {
    const storedRequestsStr = localStorage.getItem('requests')
    if (!storedRequestsStr) return true
    const storedRequest = JSON.parse(storedRequestsStr) as StoredRequest[]
    let request = storedRequest.shift()

    while (request !== undefined) {
      await fetch(request.url, request.options)
      request = storedRequest.shift()
    }

    localStorage.setItem('requests', JSON.stringify([]))
    return true
  }

  return {
    registerRequest,
    sendStoredRequests
  }
}

export default useOfflineMode
