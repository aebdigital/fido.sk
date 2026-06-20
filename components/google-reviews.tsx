"use client";

import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";
import { useRef } from "react";
import type { GoogleReview, GoogleReviewsData } from "@/lib/google-reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="fido-review-stars" aria-label={`${rating} z 5 hviezdičiek`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={index < Math.round(rating) ? "is-filled" : ""}
          size={17}
        />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const card = (
    <article className="fido-review-card">
      <div className="fido-review-author-row">
        <div className="fido-review-author">
          {review.profilePhotoUrl ? (
            <img src={review.profilePhotoUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
          ) : (
            <span className="fido-review-avatar">{review.authorName.charAt(0).toUpperCase()}</span>
          )}
          <span>
            <strong>{review.authorName}</strong>
            {review.relativeTimeDescription ? <small>{review.relativeTimeDescription}</small> : null}
          </span>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p>{review.text || "Zákazník pridal hodnotenie na Google."}</p>
    </article>
  );

  return review.authorUrl ? (
    <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="fido-review-link">
      {card}
    </a>
  ) : card;
}

export function GoogleReviews({ data }: { data: GoogleReviewsData }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const ratingLabel = data.rating?.toFixed(1).replace(".", ",");

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.86, 780), behavior: "smooth" });
  };

  return (
    <section className="fido-reviews-section" aria-labelledby="google-reviews-title">
      <div className="fido-reviews-inner">
        <div className="fido-reviews-heading">
          <div>
            <p className="fido-reviews-kicker">Google recenzie</p>
            <h2 id="google-reviews-title">Odporúčania klientov</h2>
            <p className="fido-reviews-description">
              Overené hodnotenia zákazníkov pre {data.name} priamo z Google.
            </p>
          </div>
          <div className="fido-reviews-summary">
            {ratingLabel ? (
              <div className="fido-rating-box">
                <strong>{ratingLabel}</strong>
                <span>
                  <Stars rating={data.rating ?? 0} />
                  {data.userRatingsTotal ? <small>{data.userRatingsTotal} hodnotení</small> : null}
                </span>
              </div>
            ) : null}
            <a href={data.url} target="_blank" rel="noopener noreferrer" className="fido-google-link">
              Google <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="fido-review-slider-shell">
          <div ref={trackRef} className="fido-review-track">
            {data.reviews.map((review, index) => (
              <ReviewCard review={review} key={`${review.authorName}-${review.time ?? index}`} />
            ))}
          </div>
          <div className="fido-review-controls" aria-label="Ovládanie recenzií">
            <button type="button" onClick={() => move(-1)} aria-label="Predchádzajúce recenzie">
              <ArrowLeft size={20} />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Ďalšie recenzie">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
