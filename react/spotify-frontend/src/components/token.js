export default async ({ $axios, redirect }) => {
    await $axios.get('http://localhost:3001/spotify/v1/token')
      .then(({ data }) => {
        if ( data.valid === false ) { redirect('/login') } 
        else { redirect('/') }
      })
      .catch((error) => {
        redirect('/login')
      })
    return true
  }

  