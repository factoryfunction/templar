import GlobalStylesInjector from "../components/GlobalStylesInjector";

const MyApp = (props) => {
  return (
    <>
      <GlobalStylesInjector />
      <props.Component {...props.pageProps} />
    </>
  );
};

export default MyApp;
