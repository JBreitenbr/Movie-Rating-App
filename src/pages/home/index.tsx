export const Home = () => {
  return (<div>{localStorage.getItem("guest_session_id")}</div>)
}