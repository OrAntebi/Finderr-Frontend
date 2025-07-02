// updateGigOwners.js
import fs from 'fs-extra';

(async () => {
  const gigsPath    = 'src/services/data/gig.json';
  const reviewsPath = 'src/services/data/review.json';
  const outputPath  = 'src/services/data/gigs.updated.json';
  const fieldName   = 'reviewsCount';   // שדה חדש עם המספר

  // 1. קריאת הקבצים
  const gigs     = await fs.readJson(gigsPath);
  const reviews  = await fs.readJson(reviewsPath);

  // 2. מיפוי ownerId → כמות ביקורות
  const counts = reviews.reduce((acc, r) => {
    const id = r?.aboutUser?._id;
    if (!id) return acc;
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  // 3. עדכון כל Gig
  for (const gig of gigs) {
    const owner = gig.owner ?? {};
    const ownerId = owner._id;
    if (!ownerId) continue;

    // מחיקת השדה הישן (אם קיים)
    delete owner.reviews;

    // הוספת הספירה
    owner[fieldName] = counts[ownerId] ?? 0;
  }

  // 4. כתיבה לקובץ חדש
  await fs.writeJson(outputPath, gigs, { spaces: 2 });

  console.log('✅  gigs.updated.json נוצר בהצלחה');
})();
