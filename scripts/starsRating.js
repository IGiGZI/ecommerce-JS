export function productRating(rate) {
  // Generate stars
  let fullStars = Math.floor(rate);
  let halfStar = rate % 1 >= 0.5;
  let totalStars = 5;
  let starsContainer = " ";
  for (let i = 0; i < totalStars; i++) {
    if (i < fullStars) {
      starsContainer += `<i class="fas fa-star text-yellow-400 md:text-lg text-[14px]"></i>`;
    } else if (i === fullStars && halfStar) {
      starsContainer += `<i class="fas fa-star-half-alt text-yellow-400 md:text-lg text-[14px]"></i>`;
    } else {
      starsContainer += `<i class="fas fa-star text-gray-400 md:text-lg text-[14px]"></i>`;
    }
  }
  return starsContainer;
}
