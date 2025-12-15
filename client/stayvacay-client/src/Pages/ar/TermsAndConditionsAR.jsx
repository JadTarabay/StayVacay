import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Legal.css";
import LanguageSwitch from "../../components/LanguageSwitch";

const TermsAndConditionsAR = () => {
  return (
    <div className="legal-page rtl" dir="rtl" lang="ar">
      <div className="legal-header">
        <h1>الشروط والأحكام</h1>
        <LanguageSwitch />
        <p className="legal-updated">آخر تحديث: يناير 2025</p>

        <div className="legal-actions">
          <a className="legal-btn" href="/legal/terms-and-conditions.ar.pdf" download>
            تنزيل PDF (AR)
          </a>
          <Link className="legal-btn outline" to="/terms-and-conditions">
            English
          </Link>
        </div>
      </div>

      <div className="legal-card">
        <p>
          باستخدامك لموقع StayVacay، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا لم توافق، يرجى عدم استخدام
          خدماتنا.
        </p>

        <h2>1. دور المنصة</h2>
        <p>
          StayVacay منصة إلكترونية لتسهيل عرض العقارات واستقبال طلبات الحجز. لا نمتلك أو ندير العقارات المعروضة إلا إذا
          تم ذكر ذلك صراحة.
        </p>

        <h2>2. مسؤوليات المستخدم</h2>
        <ul>
          <li>تقديم معلومات صحيحة وكاملة</li>
          <li>استخدام المنصة لأغراض قانونية فقط</li>
          <li>عدم إساءة استخدام محتوى الموقع أو نسخه أو استغلاله</li>
        </ul>

        <h2>3. الحجوزات والمدفوعات</h2>
        <ul>
          <li>جميع الطلبات خاضعة للتوفر والتأكيد</li>
          <li>قد تتغير الأسعار المعروضة دون إشعار مسبق</li>
          <li>قد يحدد مالك/مدير العقار سياسات الدفع والإلغاء والاسترداد</li>
        </ul>

        <h2>4. إخلاء المسؤولية</h2>
        <p>
          لا تتحمل StayVacay المسؤولية عن حالة العقار أو جودة الخدمات المقدمة من أطراف ثالثة أو النزاعات بين المستخدمين
          وملاك/مديري العقارات. استخدامك للمنصة يكون على مسؤوليتك.
        </p>

        <h2>5. الملكية الفكرية</h2>
        <p>
          جميع محتويات الموقع (الشعارات، النصوص، الصور، التصميم) مملوكة لـ StayVacay ولا يجوز استخدامها دون إذن كتابي.
        </p>

        <h2>6. الإنهاء</h2>
        <p>يجوز لنا تعليق أو إنهاء الوصول وفق تقديرنا إذا تم انتهاك هذه الشروط.</p>

        <h2>7. القانون والاختصاص القضائي</h2>
        <p>
          تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة، وتكون محاكم دبي هي الجهة القضائية المختصة حصريًا بالنظر
          في أي نزاع.
        </p>

        <h2>8. التواصل</h2>
        <p>
          للاستفسارات:
          {" "}
          <a href="mailto:contact@stayvacay.ae">contact@stayvacay.ae</a>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsAR;
