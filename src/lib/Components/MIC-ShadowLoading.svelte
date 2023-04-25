<svelte:options tag="mic-shadowloading" />

​
<div class="card">
  <div class="skeleton">
    <span />
  </div>
</div>
​

<style>
  .card {
    min-width: 100%;
    height: 100%;
  }
  .skeleton {
    min-width: 100%;
    height: 100%;
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;
    align-self: center;
    margin: 0 auto;
  }
  .skeleton span:nth-child(1) {
    display: block;
    background: #ffffff;
    background: linear-gradient(90deg, #ffffff 0%, #e6f6ff 100%);
    width: 100%;
    height: 100%;
    border-radius: 16px;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  .skeleton span:nth-child(2) {
    display: block;
    background: #ffffff;
    background: linear-gradient(90deg, #ffffff 0%, #e6f6ff 100%);
    width: 100%;
    height: 100%;
    border-radius: 16px;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  .skeleton span:nth-child(3) {
    display: block;
    background: #ffffff;
    background: linear-gradient(90deg, #ffffff 0%, #e6f6ff 100%);
    width: 100%;
    height: 100%;
    border-radius: 16px;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  .skeleton span:nth-child(4) {
    display: block;
    background: #ffffff;
    background: linear-gradient(90deg, #ffffff 0%, #e6f6ff 100%);
    width: 100%;
    height: 100%;
    border-radius: 16px;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  .skeleton span::before {
    content: "";
    height: 100%;
    width: 100%;
    display: block;
    background-color: #e6f6ff;
    transform: translateX(-100%);
    animation: skeleton-loading 1s forwards infinite;
  }
  @keyframes skeleton-loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  .card {
    width: 300px;
    height: 500px;
    display: block;
  }
</style>
